const { call, put, select, takeEvery } = require('redux-saga/effects');

// This Set tracks optimistic IDs that have already been handled by the server
// This prevents duplicates when server responses arrive before optimistic updates
const handledOptimisticIds = new Set();

// Mock API
const api = {
  sendMessage: async (channelId, message) => {
    // Simulate network delay (50-200ms)
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 150));
    
    // Simulate occasional failures
    if (Math.random() < 0.1) {
      throw new Error('Network error');
    }
    
    // Return server response with real ID
    return {
      ...message,
      id: `server-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      status: 'sent'
    };
  }
};

// Action creators
const actions = {
  addOptimisticMessage: (channelId, message) => ({
    type: 'ADD_OPTIMISTIC_MESSAGE',
    payload: { channelId, message }
  }),
  
  confirmMessage: (channelId, optimisticId, serverMessage) => ({
    type: 'CONFIRM_MESSAGE',
    payload: { channelId, optimisticId, serverMessage }
  }),
  
  removeOptimisticMessage: (channelId, optimisticId) => ({
    type: 'REMOVE_OPTIMISTIC_MESSAGE',
    payload: { channelId, optimisticId }
  }),
  
  setMessageError: (channelId, optimisticId, error) => ({
    type: 'SET_MESSAGE_ERROR',
    payload: { channelId, optimisticId, error }
  }),
  
  serverMessageReceived: (channelId, message) => ({
    type: 'SERVER_MESSAGE_RECEIVED',
    payload: { channelId, message }
  })
};

/**
 * Exercise 1: Create an optimistic message object
 * 
 * This function should:
 * 1. Create a message with temporary optimistic ID
 * 2. Include all necessary fields (text, userId, timestamp, etc.)
 * 3. Mark it as optimistic with status: 'sending'
 */
function createOptimisticMessage(text, userId) {
  // TODO: Create and return optimistic message object
  // Should include: id (optimisticId), text, userId, timestamp, status
}

/**
 * Exercise 2: Handle optimistic message creation
 * 
 * This saga should:
 * 1. Check if the optimistic ID was already handled by server
 * 2. If not handled, add to the channel's messages
 * 3. If already handled, skip adding (server beat us to it)
 */
function* handleOptimisticMessage(channelId, optimisticMessage) {
  // TODO: Check handledOptimisticIds Set
  // TODO: Conditionally dispatch ADD_OPTIMISTIC_MESSAGE
  // TODO: Return the optimistic message
}

/**
 * Exercise 3: Send message to server
 * 
 * This saga should:
 * 1. Call the API to send the message
 * 2. Handle the response and confirm the message
 * 3. Handle errors appropriately
 */
function* sendMessageToServer(channelId, optimisticMessage) {
  // TODO: Implement server communication
  // TODO: Handle success with confirmMessage
  // TODO: Handle failure with removeOptimisticMessage or setMessageError
}

/**
 * Exercise 4: Main send message saga
 * 
 * This is the main orchestrator that:
 * 1. Creates optimistic message
 * 2. Shows it immediately
 * 3. Sends to server
 * 4. Handles all edge cases
 */
function* sendMessageSaga(action) {
  const { channelId, text, userId } = action.payload;
  
  // TODO: Create optimistic message
  // TODO: Handle optimistic update
  // TODO: Send to server
  // TODO: Coordinate the entire flow
}

/**
 * Exercise 5: Handle server messages
 * 
 * When we receive a message from the server (via websocket/polling),
 * we need to check if it's a confirmation of an optimistic message
 */
function* handleServerMessage(action) {
  const { channelId, message } = action.payload;
  
  // TODO: Check if this confirms an optimistic message
  // TODO: Add to handledOptimisticIds if it does
  // TODO: Dispatch appropriate actions
}

/**
 * Exercise 6: Cleanup saga
 * 
 * Periodically clean up old entries from handledOptimisticIds
 * to prevent memory leaks
 */
function* cleanupOptimisticIds() {
  // TODO: Implement cleanup logic
  // Hint: You might want to store timestamps with IDs
}

/**
 * Root watcher saga
 */
function* watchMessages() {
  yield takeEvery('SEND_MESSAGE', sendMessageSaga);
  yield takeEvery('SERVER_MESSAGE_RECEIVED', handleServerMessage);
}

// Selectors
const selectors = {
  getChannelMessages: (state, channelId) => 
    state.messages[channelId] || [],
  
  getCurrentUser: (state) => 
    state.user.current
};

module.exports = {
  handledOptimisticIds,
  api,
  actions,
  createOptimisticMessage,
  handleOptimisticMessage,
  sendMessageToServer,
  sendMessageSaga,
  handleServerMessage,
  cleanupOptimisticIds,
  watchMessages,
  selectors
};