const {
  fetchUserSaga,
  waitForSyncSaga,
  saveCurrentUserSaga,
  loginFlowSaga,
  effectOrderingSaga,
  api,
  actions
} = require('../starter-code/effects');

const { call, put, take, select } = require('../starter-code/saga-effects');

describe('Effect Creators Kata', () => {
  describe('Exercise 1: fetchUserSaga', () => {
    it('should call api and dispatch action', () => {
      const gen = fetchUserSaga(42);
      
      // First effect should be call
      const callEffect = gen.next().value;
      expect(callEffect).toEqual(call(api.fetchUser, 42));
      
      // Mock the API response
      const user = { id: 42, name: 'Arthur Dent' };
      
      // Second effect should be put
      const putEffect = gen.next(user).value;
      expect(putEffect).toEqual(put(actions.userLoaded(user)));
      
      // Saga should be done
      expect(gen.next().done).toBe(true);
    });
  });

  describe('Exercise 2: waitForSyncSaga', () => {
    it('should wait for action then dispatch', () => {
      const gen = waitForSyncSaga();
      
      // First effect should be take
      const takeEffect = gen.next().value;
      expect(takeEffect).toEqual(take('START_SYNC'));
      
      // Second effect should be put
      const putEffect = gen.next({ type: 'START_SYNC' }).value;
      expect(putEffect).toEqual(put(actions.dataSync()));
      
      // Saga should be done
      expect(gen.next().done).toBe(true);
    });
  });

  describe('Exercise 3: saveCurrentUserSaga', () => {
    it('should save user when present', () => {
      const gen = saveCurrentUserSaga();
      
      // First effect should be select
      const selectEffect = gen.next().value;
      expect(selectEffect.type).toBe('SELECT');
      expect(selectEffect.payload.selector({ user: { current: 'test' } }))
        .toBe('test');
      
      // Mock user exists
      const user = { id: 1, name: 'Ford Prefect' };
      
      // Second effect should be call
      const callEffect = gen.next(user).value;
      expect(callEffect).toEqual(call(api.saveData, user));
      
      // Saga should be done
      expect(gen.next().done).toBe(true);
    });

    it('should show error when no user', () => {
      const gen = saveCurrentUserSaga();
      
      // First effect should be select
      gen.next();
      
      // Mock no user
      const putEffect = gen.next(null).value;
      expect(putEffect).toEqual(put(actions.showError("No user found")));
      
      // Saga should be done
      expect(gen.next().done).toBe(true);
    });
  });

  describe('Exercise 4: loginFlowSaga', () => {
    it('should handle login flow', () => {
      const gen = loginFlowSaga();
      
      // First effect should be take
      const takeEffect = gen.next().value;
      expect(takeEffect).toEqual(take('LOGIN_REQUEST'));
      
      // Mock the action
      const credentials = { username: 'zaphod', password: 'beeblebrox' };
      const action = { type: 'LOGIN_REQUEST', payload: credentials };
      
      // Second effect should be call
      const callEffect = gen.next(action).value;
      expect(callEffect).toEqual(call(api.authenticate, credentials));
      
      // Mock the response
      const response = { token: 'secret-42' };
      
      // Third effect should be put
      const putEffect = gen.next(response).value;
      expect(putEffect).toEqual(put(actions.loginSuccess('secret-42')));
      
      // Should return the token
      const result = gen.next();
      expect(result.value).toBe('secret-42');
      expect(result.done).toBe(true);
    });
  });

  describe('Exercise 5: effectOrderingSaga', () => {
    it('should execute effects in correct order', () => {
      const gen = effectOrderingSaga();
      
      // 1. Select user
      const selectEffect = gen.next().value;
      expect(selectEffect.type).toBe('SELECT');
      
      // Mock user
      const user = { id: 99, name: 'Marvin' };
      
      // 2. Put FETCH_START
      const putStartEffect = gen.next(user).value;
      expect(putStartEffect).toEqual(put({ type: 'FETCH_START' }));
      
      // 3. Call API
      const callEffect = gen.next().value;
      expect(callEffect).toEqual(call(api.fetchUser, 99));
      
      // Mock response
      const result = { id: 99, name: 'Marvin', updated: true };
      
      // 4. Put FETCH_END
      const putEndEffect = gen.next(result).value;
      expect(putEndEffect).toEqual(put({ type: 'FETCH_END', payload: result }));
      
      expect(gen.next().done).toBe(true);
    });

    it('should use default id when no user', () => {
      const gen = effectOrderingSaga();
      
      // Skip to after select
      gen.next();
      
      // Mock no user
      const putStartEffect = gen.next(null).value;
      expect(putStartEffect).toEqual(put({ type: 'FETCH_START' }));
      
      // Should call with id 1
      const callEffect = gen.next().value;
      expect(callEffect).toEqual(call(api.fetchUser, 1));
    });
  });
});