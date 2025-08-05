const { call, put, take, fork, cancel, cancelled, delay } = require('./saga-effects');
const { takeEvery, takeLatest, takeLeading } = require('./saga-helpers');

// Mock API
const api = {
  fetchData: async (id) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return { id, data: `Result for ${id}` };
  },
  saveData: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return { success: true, saved: data };
  }
};

/**
 * Exercise 1: Implement a worker saga for data fetching
 * 
 * This saga should:
 * 1. Call api.fetchData with the action's payload.id
 * 2. Dispatch FETCH_SUCCESS with the result
 * 3. Handle cancellation by dispatching FETCH_CANCELLED
 */
function* fetchWorkerSaga(action) {
  // TODO: Implement the worker saga
  // Hint: Use try/finally to handle cancellation
}

/**
 * Exercise 2: Create a watcher using takeEvery
 * 
 * Watch for FETCH_REQUEST actions and run fetchWorkerSaga for each
 * This should handle ALL requests concurrently
 */
function* watchEveryFetch() {
  // TODO: Use takeEvery to watch FETCH_REQUEST
}

/**
 * Exercise 3: Create a watcher using takeLatest
 * 
 * Watch for SEARCH_REQUEST actions and run searchWorkerSaga
 * This should cancel previous searches when a new one comes in
 */
function* searchWorkerSaga(action) {
  try {
    yield delay(300); // Debounce
    const result = yield call(api.fetchData, action.payload.query);
    yield put({ type: 'SEARCH_SUCCESS', payload: result });
  } finally {
    if (yield cancelled()) {
      yield put({ type: 'SEARCH_CANCELLED' });
    }
  }
}

function* watchLatestSearch() {
  // TODO: Use takeLatest to watch SEARCH_REQUEST
}

/**
 * Exercise 4: Create a watcher using takeLeading
 * 
 * Watch for SAVE_REQUEST actions and run saveWorkerSaga
 * This should ignore new requests while one is in progress
 */
function* saveWorkerSaga(action) {
  yield put({ type: 'SAVE_START' });
  try {
    const result = yield call(api.saveData, action.payload);
    yield put({ type: 'SAVE_SUCCESS', payload: result });
  } catch (error) {
    yield put({ type: 'SAVE_ERROR', payload: error.message });
  } finally {
    yield put({ type: 'SAVE_END' });
  }
}

function* watchLeadingSave() {
  // TODO: Use takeLeading to watch SAVE_REQUEST
}

/**
 * Exercise 5: Custom watcher pattern
 * 
 * Create a throttled watcher that:
 * 1. Processes the first action immediately
 * 2. Ignores subsequent actions for 1000ms
 * 3. After the throttle period, processes the most recent action if any
 * 
 * This combines aspects of takeLeading and takeLatest
 */
function* analyticsWorkerSaga(action) {
  yield put({ type: 'ANALYTICS_TRACK', payload: action.payload });
}

function* watchThrottledAnalytics() {
  // TODO: Implement custom throttled watcher
  // Hint: You'll need to track pending actions and use delay
}

/**
 * Exercise 6: Advanced - Implement takeEvery from scratch
 * 
 * Create your own version of takeEvery using while, take, and fork
 */
function* customTakeEvery(pattern, worker) {
  // TODO: Implement takeEvery behavior
  // Hint: Infinite loop with take and fork
}

function* watchCustomEvery() {
  yield customTakeEvery('CUSTOM_ACTION', function* (action) {
    yield put({ type: 'CUSTOM_HANDLED', payload: action.payload });
  });
}

module.exports = {
  fetchWorkerSaga,
  watchEveryFetch,
  searchWorkerSaga,
  watchLatestSearch,
  saveWorkerSaga,
  watchLeadingSave,
  analyticsWorkerSaga,
  watchThrottledAnalytics,
  customTakeEvery,
  watchCustomEvery,
  // Export for testing
  api
};