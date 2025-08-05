const { call, put, takeEvery, delay, race } = require('redux-saga/effects');

// Mock Navigation API
const navigationApi = {
  searchDestinations: async (query) => {
    // Simulate variable network delay
    const delayTime = 100 + Math.random() * 900; // 100-1000ms
    await new Promise(resolve => setTimeout(resolve, delayTime));
    
    // Return mock results
    return {
      query,
      results: [
        `${query} Prime`,
        `New ${query}`,
        `${query} Station`,
        `Planet ${query}`
      ],
      searchTime: delayTime
    };
  },
  
  setCoordinates: async (destination) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { destination, coordinates: `${Math.random()},${Math.random()}` };
  }
};

// Action creators
const actions = {
  setSearchLoading: (isLoading) => ({
    type: 'SET_SEARCH_LOADING',
    payload: isLoading
  }),
  
  setSearchResults: (results) => ({
    type: 'SET_SEARCH_RESULTS',
    payload: results
  }),
  
  setSearchError: (error) => ({
    type: 'SET_SEARCH_ERROR',
    payload: error
  }),
  
  setNavigationLoading: (isLoading) => ({
    type: 'SET_NAVIGATION_LOADING',
    payload: isLoading
  }),
  
  navigationComplete: (coordinates) => ({
    type: 'NAVIGATION_COMPLETE',
    payload: coordinates
  })
};

/**
 * BUG 1: This saga has race conditions when multiple searches happen quickly
 * The loading state gets messed up and results appear out of order
 */
function* searchDestinationsSaga(action) {
  const { query } = action.payload;
  
  yield put(actions.setSearchLoading(true));
  
  try {
    // BUG: No debouncing, every keystroke triggers a search
    const results = yield call(navigationApi.searchDestinations, query);
    
    // BUG: By the time this runs, a newer search might have started
    yield put(actions.setSearchResults(results));
    yield put(actions.setSearchLoading(false));
  } catch (error) {
    yield put(actions.setSearchError(error.message));
    yield put(actions.setSearchLoading(false));
  }
}

/**
 * BUG 2: This saga doesn't handle timeouts properly
 * The timeout doesn't actually cancel the navigation request
 */
function* navigateToDestinationSaga(action) {
  const { destination } = action.payload;
  
  yield put(actions.setNavigationLoading(true));
  
  try {
    // BUG: Race doesn't cancel the losing effect
    const { result, timeout } = yield race({
      result: call(navigationApi.setCoordinates, destination),
      timeout: delay(2000)
    });
    
    if (timeout) {
      throw new Error('Navigation timeout - lost in space!');
    }
    
    yield put(actions.navigationComplete(result));
    yield put(actions.setNavigationLoading(false));
  } catch (error) {
    yield put(actions.setSearchError(error.message));
    // BUG: What if this saga is cancelled? Loading stays true forever
    yield put(actions.setNavigationLoading(false));
  }
}

/**
 * BUG 3: Using takeEvery causes problems with concurrent requests
 */
function* watchNavigation() {
  // BUG: takeEvery allows multiple concurrent searches
  yield takeEvery('SEARCH_DESTINATIONS', searchDestinationsSaga);
  
  // BUG: Multiple navigation requests can run at once
  yield takeEvery('NAVIGATE_TO', navigateToDestinationSaga);
}

module.exports = {
  navigationApi,
  actions,
  searchDestinationsSaga,
  navigateToDestinationSaga,
  watchNavigation
};