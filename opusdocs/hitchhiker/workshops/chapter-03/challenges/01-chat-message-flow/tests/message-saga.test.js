const { runSaga } = require('redux-saga');
const {
  handledOptimisticIds,
  api,
  actions,
  createOptimisticMessage,
  handleOptimisticMessage,
  sendMessageToServer,
  sendMessageSaga,
  handleServerMessage,
  watchMessages,
  selectors
} = require('../starter-code/message-saga');

// Test utilities
function createMockStore(initialState = {}) {
  const dispatched = [];
  const store = {
    getState: () => initialState,
    dispatch: (action) => dispatched.push(action),
    dispatched
  };
  return store;
}

async function recordSaga(saga, initialAction, state = {}) {
  const dispatched = [];
  await runSaga(
    {
      dispatch: (action) => dispatched.push(action),
      getState: () => state
    },
    saga,
    initialAction
  ).toPromise();
  return dispatched;
}

describe('Chat Message Flow Challenge', () => {
  beforeEach(() => {
    // Clear the Set before each test
    handledOptimisticIds.clear();
    // Reset mock to ensure consistent behavior
    jest.clearAllMocks();
  });

  describe('Exercise 1: createOptimisticMessage', () => {
    it('should create message with all required fields', () => {
      const message = createOptimisticMessage('Hello World', 'user-123');
      
      expect(message).toMatchObject({
        text: 'Hello World',
        userId: 'user-123',
        status: 'sending'
      });
      
      expect(message.id).toBeTruthy();
      expect(message.id).toMatch(/^optimistic-/);
      expect(message.timestamp).toBeCloseTo(Date.now(), -2);
    });

    it('should generate unique IDs', () => {
      const msg1 = createOptimisticMessage('Test 1', 'user-123');
      const msg2 = createOptimisticMessage('Test 2', 'user-123');
      
      expect(msg1.id).not.toBe(msg2.id);
    });
  });

  describe('Exercise 2: handleOptimisticMessage', () => {
    it('should add message when not already handled', async () => {
      const optimisticMessage = createOptimisticMessage('Test', 'user-123');
      const channelId = 'channel-1';
      
      const dispatched = await recordSaga(
        handleOptimisticMessage,
        channelId,
        optimisticMessage
      );
      
      expect(dispatched).toContainEqual(
        actions.addOptimisticMessage(channelId, optimisticMessage)
      );
    });

    it('should skip adding when already handled by server', async () => {
      const optimisticMessage = createOptimisticMessage('Test', 'user-123');
      const channelId = 'channel-1';
      
      // Mark as already handled
      handledOptimisticIds.add(optimisticMessage.id);
      
      const dispatched = await recordSaga(
        handleOptimisticMessage,
        channelId,
        optimisticMessage
      );
      
      expect(dispatched).toHaveLength(0);
      expect(handledOptimisticIds.has(optimisticMessage.id)).toBe(false);
    });
  });

  describe('Exercise 3: sendMessageToServer', () => {
    it('should handle successful server response', async () => {
      const optimisticMessage = createOptimisticMessage('Success', 'user-123');
      const channelId = 'channel-1';
      
      // Mock successful API call
      const serverMessage = { ...optimisticMessage, id: 'server-123', status: 'sent' };
      jest.spyOn(api, 'sendMessage').mockResolvedValueOnce(serverMessage);
      
      const dispatched = await recordSaga(
        sendMessageToServer,
        channelId,
        optimisticMessage
      );
      
      expect(api.sendMessage).toHaveBeenCalledWith(channelId, optimisticMessage);
      expect(dispatched).toContainEqual(
        actions.confirmMessage(channelId, optimisticMessage.id, serverMessage)
      );
    });

    it('should handle server errors', async () => {
      const optimisticMessage = createOptimisticMessage('Error', 'user-123');
      const channelId = 'channel-1';
      
      // Mock failed API call
      jest.spyOn(api, 'sendMessage').mockRejectedValueOnce(new Error('Network error'));
      
      const dispatched = await recordSaga(
        sendMessageToServer,
        channelId,
        optimisticMessage
      );
      
      // Should either remove the message or mark it with error
      const errorActions = dispatched.filter(
        action => 
          action.type === 'REMOVE_OPTIMISTIC_MESSAGE' ||
          action.type === 'SET_MESSAGE_ERROR'
      );
      
      expect(errorActions.length).toBeGreaterThan(0);
    });
  });

  describe('Exercise 4: sendMessageSaga (main flow)', () => {
    it('should orchestrate complete message flow', async () => {
      const action = {
        type: 'SEND_MESSAGE',
        payload: {
          channelId: 'channel-1',
          text: 'Complete flow test',
          userId: 'user-123'
        }
      };
      
      const serverResponse = {
        id: 'server-msg-123',
        text: 'Complete flow test',
        userId: 'user-123',
        timestamp: Date.now(),
        status: 'sent'
      };
      
      jest.spyOn(api, 'sendMessage').mockResolvedValueOnce(serverResponse);
      
      const dispatched = await recordSaga(sendMessageSaga, action);
      
      // Should dispatch optimistic message
      const optimisticAction = dispatched.find(
        a => a.type === 'ADD_OPTIMISTIC_MESSAGE'
      );
      expect(optimisticAction).toBeTruthy();
      
      // Should dispatch confirmation
      const confirmAction = dispatched.find(
        a => a.type === 'CONFIRM_MESSAGE'
      );
      expect(confirmAction).toBeTruthy();
      expect(confirmAction.payload.serverMessage).toEqual(serverResponse);
    });
  });

  describe('Exercise 5: handleServerMessage', () => {
    it('should mark optimistic messages as handled', async () => {
      const optimisticId = 'optimistic-123';
      const serverMessage = {
        id: 'server-123',
        optimisticId: optimisticId,
        text: 'Test',
        status: 'sent'
      };
      
      const action = actions.serverMessageReceived('channel-1', serverMessage);
      
      await recordSaga(handleServerMessage, action);
      
      expect(handledOptimisticIds.has(optimisticId)).toBe(true);
    });

    it('should handle regular server messages', async () => {
      const serverMessage = {
        id: 'server-456',
        text: 'From another user',
        userId: 'other-user',
        status: 'sent'
      };
      
      const action = actions.serverMessageReceived('channel-1', serverMessage);
      
      const dispatched = await recordSaga(handleServerMessage, action);
      
      // Should not affect handledOptimisticIds
      expect(handledOptimisticIds.size).toBe(0);
    });
  });

  describe('Race condition handling', () => {
    it('should prevent duplicates when server beats optimistic update', async () => {
      const channelId = 'channel-1';
      const text = 'Race condition test';
      const userId = 'user-123';
      
      // Simulate server message arriving first
      const serverMessage = {
        id: 'server-789',
        optimisticId: 'optimistic-will-be-used',
        text,
        userId,
        status: 'sent'
      };
      
      // Server message arrives first
      await recordSaga(
        handleServerMessage,
        actions.serverMessageReceived(channelId, serverMessage)
      );
      
      // Now the optimistic update tries to happen
      const optimisticMessage = {
        id: serverMessage.optimisticId,
        text,
        userId,
        timestamp: Date.now(),
        status: 'sending'
      };
      
      const dispatched = await recordSaga(
        handleOptimisticMessage,
        channelId,
        optimisticMessage
      );
      
      // Should not add duplicate
      expect(dispatched).toHaveLength(0);
    });
  });

  describe('Integration test', () => {
    it('should handle concurrent messages correctly', async () => {
      const state = {
        messages: {
          'channel-1': []
        },
        user: {
          current: { id: 'user-123', name: 'Test User' }
        }
      };
      
      const store = createMockStore(state);
      
      // Send multiple messages concurrently
      const promises = [
        recordSaga(sendMessageSaga, {
          type: 'SEND_MESSAGE',
          payload: { channelId: 'channel-1', text: 'Message 1', userId: 'user-123' }
        }, state),
        recordSaga(sendMessageSaga, {
          type: 'SEND_MESSAGE',
          payload: { channelId: 'channel-1', text: 'Message 2', userId: 'user-123' }
        }, state),
        recordSaga(sendMessageSaga, {
          type: 'SEND_MESSAGE',
          payload: { channelId: 'channel-1', text: 'Message 3', userId: 'user-123' }
        }, state)
      ];
      
      const results = await Promise.all(promises);
      
      // Each should have its own optimistic update
      const optimisticActions = results.flat().filter(
        a => a.type === 'ADD_OPTIMISTIC_MESSAGE'
      );
      
      expect(optimisticActions).toHaveLength(3);
      
      // All optimistic IDs should be unique
      const optimisticIds = optimisticActions.map(
        a => a.payload.message.id
      );
      expect(new Set(optimisticIds).size).toBe(3);
    });
  });
});