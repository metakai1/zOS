const {
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
} = require('../starter-code/watchers');

const { call, put, take, fork, cancel, cancelled, delay } = require('../starter-code/saga-effects');
const { takeEvery, takeLatest, takeLeading } = require('../starter-code/saga-helpers');

describe('Watcher Patterns Kata', () => {
  describe('Exercise 1: fetchWorkerSaga', () => {
    it('should fetch data and dispatch success', () => {
      const action = { type: 'FETCH_REQUEST', payload: { id: 42 } };
      const gen = fetchWorkerSaga(action);
      
      // Should call API
      expect(gen.next().value).toEqual(call(api.fetchData, 42));
      
      // Mock response
      const result = { id: 42, data: 'Result for 42' };
      
      // Should dispatch success
      expect(gen.next(result).value).toEqual(
        put({ type: 'FETCH_SUCCESS', payload: result })
      );
      
      // Check finally block
      gen.next();
      
      // Should check if cancelled
      expect(gen.next().value).toEqual(cancelled());
      
      // Not cancelled, should complete
      expect(gen.next(false).done).toBe(true);
    });

    it('should handle cancellation', () => {
      const action = { type: 'FETCH_REQUEST', payload: { id: 42 } };
      const gen = fetchWorkerSaga(action);
      
      // Start the saga
      gen.next();
      
      // Simulate error to trigger finally
      gen.return();
      
      // Should check if cancelled
      expect(gen.next().value).toEqual(cancelled());
      
      // Was cancelled
      expect(gen.next(true).value).toEqual(
        put({ type: 'FETCH_CANCELLED' })
      );
      
      expect(gen.next().done).toBe(true);
    });
  });

  describe('Exercise 2: watchEveryFetch', () => {
    it('should use takeEvery for FETCH_REQUEST', () => {
      const gen = watchEveryFetch();
      const effect = gen.next().value;
      
      expect(effect.type).toBe('FORK');
      expect(effect.payload.fn.name).toContain('takeEvery');
      
      // The inner generator should watch FETCH_REQUEST
      const innerGen = effect.payload.fn();
      expect(innerGen.next().value).toEqual(take('FETCH_REQUEST'));
    });
  });

  describe('Exercise 3: watchLatestSearch', () => {
    it('should use takeLatest for SEARCH_REQUEST', () => {
      const gen = watchLatestSearch();
      const effect = gen.next().value;
      
      expect(effect.type).toBe('FORK');
      expect(effect.payload.fn.name).toContain('takeLatest');
      
      // The inner generator should watch SEARCH_REQUEST
      const innerGen = effect.payload.fn();
      expect(innerGen.next().value).toEqual(take('SEARCH_REQUEST'));
    });
  });

  describe('Exercise 4: watchLeadingSave', () => {
    it('should use takeLeading for SAVE_REQUEST', () => {
      const gen = watchLeadingSave();
      const effect = gen.next().value;
      
      expect(effect.type).toBe('FORK');
      expect(effect.payload.fn.name).toContain('takeLeading');
      
      // The inner generator should watch SAVE_REQUEST
      const innerGen = effect.payload.fn();
      expect(innerGen.next().value).toEqual(take('SAVE_REQUEST'));
    });
  });

  describe('Exercise 5: watchThrottledAnalytics', () => {
    it('should implement throttled behavior', () => {
      const gen = watchThrottledAnalytics();
      
      // Should take first action
      expect(gen.next().value).toEqual(take('ANALYTICS_EVENT'));
      
      const firstAction = { type: 'ANALYTICS_EVENT', payload: { event: 'click' } };
      
      // Should fork the worker
      const forkEffect = gen.next(firstAction).value;
      expect(forkEffect.type).toBe('FORK');
      
      // Should delay for throttle period
      expect(gen.next().value).toEqual(delay(1000));
      
      // Should continue the pattern
      expect(gen.next().value.type).toBe('TAKE');
    });
  });

  describe('Exercise 6: customTakeEvery', () => {
    it('should implement takeEvery behavior', () => {
      const pattern = 'TEST_ACTION';
      const worker = function* (action) {
        yield put({ type: 'WORKED', payload: action.payload });
      };
      
      const gen = customTakeEvery(pattern, worker);
      
      // Should continuously take and fork
      expect(gen.next().value).toEqual(take(pattern));
      
      const action = { type: pattern, payload: 'test' };
      expect(gen.next(action).value).toEqual(fork(worker, action));
      
      // Should loop back to take
      expect(gen.next().value).toEqual(take(pattern));
    });
  });

  describe('Worker saga behavior', () => {
    it('searchWorkerSaga should debounce and handle cancellation', () => {
      const action = { type: 'SEARCH_REQUEST', payload: { query: 'hitchhiker' } };
      const gen = searchWorkerSaga(action);
      
      // Should delay (debounce)
      expect(gen.next().value).toEqual(delay(300));
      
      // Should call API
      expect(gen.next().value).toEqual(call(api.fetchData, 'hitchhiker'));
      
      // Mock response
      const result = { data: 'search results' };
      
      // Should dispatch success
      expect(gen.next(result).value).toEqual(
        put({ type: 'SEARCH_SUCCESS', payload: result })
      );
      
      // Finally block
      gen.next();
      expect(gen.next().value).toEqual(cancelled());
      
      // Not cancelled
      expect(gen.next(false).done).toBe(true);
    });
  });
});