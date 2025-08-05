// Effect Creators - Complete Solution
const { call, put, take, select } = require('./saga-effects');

// Mock API and action creators
const api = {
  fetchUser: (id) => ({ id, name: 'Arthur Dent' }),
  saveData: (data) => ({ success: true, data }),
  authenticate: (credentials) => ({ token: 'secret-42' })
};

const actions = {
  userLoaded: (user) => ({ type: 'USER_LOADED', payload: user }),
  dataSync: () => ({ type: 'DATA_SYNC' }),
  loginSuccess: (token) => ({ type: 'LOGIN_SUCCESS', payload: token }),
  showError: (error) => ({ type: 'SHOW_ERROR', payload: error })
};

/**
 * Exercise 1: Basic API call
 */
function* fetchUserSaga(userId) {
  const user = yield call(api.fetchUser, userId);
  yield put(actions.userLoaded(user));
}

/**
 * Exercise 2: Waiting for actions
 */
function* waitForSyncSaga() {
  yield take('START_SYNC');
  yield put(actions.dataSync());
}

/**
 * Exercise 3: Reading from state
 */
function* saveCurrentUserSaga() {
  const user = yield select(state => state.user.current);
  if (user) {
    yield call(api.saveData, user);
  } else {
    yield put(actions.showError("No user found"));
  }
}

/**
 * Exercise 4: Complex flow
 */
function* loginFlowSaga() {
  const action = yield take('LOGIN_REQUEST');
  const response = yield call(api.authenticate, action.payload);
  yield put(actions.loginSuccess(response.token));
  return response.token;
}

/**
 * Exercise 5: Multiple effects
 */
function* effectOrderingSaga() {
  const user = yield select(state => state.user.current);
  yield put({ type: 'FETCH_START' });
  const result = yield call(api.fetchUser, user ? user.id : 1);
  yield put({ type: 'FETCH_END', payload: result });
}

module.exports = {
  fetchUserSaga,
  waitForSyncSaga,
  saveCurrentUserSaga,
  loginFlowSaga,
  effectOrderingSaga,
  api,
  actions
};