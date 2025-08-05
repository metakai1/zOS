// Watcher Patterns - Complete Solution
const { call, put, take, fork, cancel, cancelled, delay } = require('./saga-effects');
const { takeEvery, takeLatest, takeLeading } = require('./saga-helpers');

// Mock API
const api = {
  fetchData: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return { id, data: `Result for ${id}` };
  },
  saveData: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return { success: true, saved: data };
  }
};

/**
 * Exercise 1: Worker saga with cancellation handling
 */
function* fetchWorkerSaga(action) {
  try {
    const result = yield call(api.fetchData, action.payload.id);
    yield put({ type: 'FETCH_SUCCESS', payload: result });
  } finally {
    if (yield cancelled()) {
      yield put({ type: 'FETCH_CANCELLED' });
    }
  }
}

/**
 * Exercise 2: takeEvery watcher
 */
function* watchEveryFetch() {
  yield takeEvery('FETCH_REQUEST', fetchWorkerSaga);
}

/**
 * Exercise 3: takeLatest watcher
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
  yield takeLatest('SEARCH_REQUEST', searchWorkerSaga);
}

/**
 * Exercise 4: takeLeading watcher
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
  yield takeLeading('SAVE_REQUEST', saveWorkerSaga);
}

/**
 * Exercise 5: Custom throttled watcher
 */
function* analyticsWorkerSaga(action) {
  yield put({ type: 'ANALYTICS_TRACK', payload: action.payload });
}

function* watchThrottledAnalytics() {
  while (true) {
    // Process first action immediately
    const firstAction = yield take('ANALYTICS_EVENT');
    yield fork(analyticsWorkerSaga, firstAction);
    
    // Start throttle window
    yield delay(1000);
    
    // Non-blocking take to check if any actions came during throttle
    let lastAction = null;
    let moreActions = true;
    
    while (moreActions) {
      const { action, timeout } = yield race({
        action: take('ANALYTICS_EVENT'),
        timeout: delay(0) // Immediate timeout to make it non-blocking
      });
      
      if (action) {
        lastAction = action;
      } else {
        moreActions = false;
      }
    }
    
    // Process the last action if any
    if (lastAction) {
      yield fork(analyticsWorkerSaga, lastAction);
    }
  }
}

/**
 * Exercise 6: Custom takeEvery implementation
 */
function* customTakeEvery(pattern, worker) {
  while (true) {
    const action = yield take(pattern);
    yield fork(worker, action);
  }
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
  api
};