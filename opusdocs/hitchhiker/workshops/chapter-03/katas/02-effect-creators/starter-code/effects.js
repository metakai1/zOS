// Import Redux-Saga effects
// In real code: import { call, put, take, select } from 'redux-saga/effects';
// For this exercise, we'll use the provided effect creators
const { call, put, take, select } = require('./saga-effects');

// Mock API and action creators for the exercises
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
 * 
 * Create a saga that:
 * 1. Calls api.fetchUser with userId
 * 2. Dispatches userLoaded action with the result
 */
function* fetchUserSaga(userId) {
  // TODO: Use call effect to invoke api.fetchUser
  // TODO: Use put effect to dispatch actions.userLoaded
}

/**
 * Exercise 2: Waiting for actions
 * 
 * Create a saga that:
 * 1. Waits for a 'START_SYNC' action
 * 2. Dispatches the dataSync action
 */
function* waitForSyncSaga() {
  // TODO: Use take effect to wait for 'START_SYNC'
  // TODO: Use put effect to dispatch actions.dataSync
}

/**
 * Exercise 3: Reading from state
 * 
 * Create a saga that:
 * 1. Reads the current user from state (state.user.current)
 * 2. If user exists, calls api.saveData with the user
 * 3. If no user, dispatches showError with message "No user found"
 */
function* saveCurrentUserSaga() {
  // TODO: Use select effect to read state.user.current
  // TODO: Use conditional logic with call or put
}

/**
 * Exercise 4: Complex flow
 * 
 * Create a login saga that:
 * 1. Waits for LOGIN_REQUEST action (which has credentials in payload)
 * 2. Calls api.authenticate with the credentials
 * 3. Dispatches loginSuccess with the token
 * 4. Returns the token
 */
function* loginFlowSaga() {
  // TODO: Implement complete login flow
  // Hint: const action = yield take('LOGIN_REQUEST') gives you the action
}

/**
 * Exercise 5: Multiple effects
 * 
 * Create a saga that demonstrates effect ordering:
 * 1. Select user from state.user.current
 * 2. Put an action { type: 'FETCH_START' }
 * 3. Call api.fetchUser with user.id (or 1 if no user)
 * 4. Put an action { type: 'FETCH_END', payload: result }
 */
function* effectOrderingSaga() {
  // TODO: Chain multiple effects in order
}

module.exports = {
  fetchUserSaga,
  waitForSyncSaga,
  saveCurrentUserSaga,
  loginFlowSaga,
  effectOrderingSaga,
  // Export for testing
  api,
  actions
};