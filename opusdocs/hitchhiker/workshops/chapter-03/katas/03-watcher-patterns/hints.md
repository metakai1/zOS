# Hints for Watcher Patterns Kata

## Progressive Hints (Read one at a time!)

### Hint 1: Understanding Watcher Patterns
- **takeEvery**: Runs a new saga for EVERY action (concurrent)
- **takeLatest**: Cancels previous saga, runs only the latest
- **takeLeading**: Ignores new actions while one is running

### Hint 2: Basic Worker Pattern
A worker saga typically follows this pattern:
```javascript
function* workerSaga(action) {
  try {
    // Do the work
    const result = yield call(api.method, action.payload);
    yield put({ type: 'SUCCESS', payload: result });
  } catch (error) {
    yield put({ type: 'ERROR', payload: error });
  }
}
```

### Hint 3: Handling Cancellation
Use try/finally to detect cancellation:
```javascript
function* cancellableWorker(action) {
  try {
    // Your work here
  } finally {
    if (yield cancelled()) {
      // Cleanup or dispatch cancellation action
    }
  }
}
```

### Hint 4: Using Watcher Helpers
```javascript
function* watcherSaga() {
  yield takeEvery('ACTION_TYPE', workerSaga);
  // or
  yield takeLatest('ACTION_TYPE', workerSaga);
  // or
  yield takeLeading('ACTION_TYPE', workerSaga);
}
```

### Hint 5: Throttled Watcher Pattern
For the throttled watcher, think about:
1. Process first action immediately
2. Start a timer
3. Collect any actions during the timer
4. When timer expires, process the most recent if any
```javascript
function* throttledWatcher() {
  while (true) {
    const action = yield take('ACTION');
    yield fork(worker, action);
    
    // Now implement throttling logic
    yield delay(1000);
    
    // Check if more actions came in...
  }
}
```

### Hint 6: Custom takeEvery Implementation
The basic pattern is:
```javascript
function* customTakeEvery(pattern, worker) {
  while (true) {
    const action = yield take(pattern);
    yield fork(worker, action); // fork, not call!
  }
}
```

### Hint 7: Complete Throttled Implementation
```javascript
function* watchThrottledAnalytics() {
  while (true) {
    // Take first action
    const firstAction = yield take('ANALYTICS_EVENT');
    yield fork(analyticsWorkerSaga, firstAction);
    
    // Start throttle window
    yield delay(1000);
    
    // Check if any actions came during throttle
    // You might need to use race or non-blocking take here
  }
}
```

## Key Insights

### Why takeEvery?
Use when every action needs to be processed independently:
- Logging events
- Analytics tracking  
- Independent API calls

### Why takeLatest?
Use when only the most recent matters:
- Search autocomplete
- Data fetching that can be superseded
- UI state updates

### Why takeLeading?
Use when you want to prevent duplicate operations:
- Form submissions
- Payment processing
- One-time operations

Remember: The choice of watcher pattern can make or break your user experience!