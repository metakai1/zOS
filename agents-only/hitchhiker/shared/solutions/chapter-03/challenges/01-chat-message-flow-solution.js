// Chat Message Flow - Complete Solution
const { call, put, select, takeEvery } = require('redux-saga/effects');

// This Set tracks optimistic IDs that have already been handled by the server
const handledOptimisticIds = new Set();

// Mock API
const api = {
  sendMessage: async (channelId, message) => {
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 150));
    
    if (Math.random() < 0.1) {
      throw new Error('Network error');
    }
    
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
 */
function createOptimisticMessage(text, userId) {
  return {
    id: `optimistic-${Date.now()}-${Math.random()}`,
    text,
    userId,
    timestamp: Date.now(),
    status: 'sending'
  };
}

/**
 * Exercise 2: Handle optimistic message creation
 */
function* handleOptimisticMessage(channelId, optimisticMessage) {
  // Check if server already handled this message
  if (handledOptimisticIds.has(optimisticMessage.id)) {
    // Server beat us to it! Remove from set and skip adding
    handledOptimisticIds.delete(optimisticMessage.id);
    return optimisticMessage;
  }
  
  // Normal case: add optimistic message to UI
  yield put(actions.addOptimisticMessage(channelId, optimisticMessage));
  return optimisticMessage;
}

/**
 * Exercise 3: Send message to server
 */
function* sendMessageToServer(channelId, optimisticMessage) {
  try {
    const serverMessage = yield call(api.sendMessage, channelId, optimisticMessage);
    yield put(actions.confirmMessage(channelId, optimisticMessage.id, serverMessage));
  } catch (error) {
    // Could either remove the message or mark it with error
    // This implementation removes it, but marking with error is also valid
    yield put(actions.removeOptimisticMessage(channelId, optimisticMessage.id));
    
    // Alternative: Mark with error for retry functionality
    // yield put(actions.setMessageError(channelId, optimisticMessage.id, error.message));
  }
}

/**
 * Exercise 4: Main send message saga
 */
function* sendMessageSaga(action) {
  const { channelId, text, userId } = action.payload;
  
  // Create optimistic message
  const optimisticMessage = createOptimisticMessage(text, userId);
  
  // Show immediately (handles deduplication)
  yield call(handleOptimisticMessage, channelId, optimisticMessage);
  
  // Send to server in background
  yield call(sendMessageToServer, channelId, optimisticMessage);
}

/**
 * Exercise 5: Handle server messages
 */
function* handleServerMessage(action) {
  const { channelId, message } = action.payload;
  
  // Check if this is a confirmation of an optimistic message
  if (message.optimisticId) {
    // Mark this optimistic ID as handled
    // This prevents duplicates if our optimistic update hasn't run yet
    handledOptimisticIds.add(message.optimisticId);
  }
  
  // The actual adding of the server message to state would be handled
  // by the reducer, not the saga
}

/**
 * Exercise 6: Cleanup saga
 */
// Advanced: Store IDs with timestamps for cleanup
const handledOptimisticIdsWithTime = new Map();

function* cleanupOptimisticIds() {
  const maxAge = 5 * 60 * 1000; // 5 minutes
  const now = Date.now();
  
  for (const [id, timestamp] of handledOptimisticIdsWithTime.entries()) {
    if (now - timestamp > maxAge) {
      handledOptimisticIdsWithTime.delete(id);
      handledOptimisticIds.delete(id);
    }
  }
}

// Enhanced handleServerMessage that tracks time
function* handleServerMessageEnhanced(action) {
  const { channelId, message } = action.payload;
  
  if (message.optimisticId) {
    handledOptimisticIds.add(message.optimisticId);
    handledOptimisticIdsWithTime.set(message.optimisticId, Date.now());
  }
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