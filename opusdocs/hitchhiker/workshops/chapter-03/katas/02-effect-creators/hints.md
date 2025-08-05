# Hints for Effect Creators Kata

## Progressive Hints (Read one at a time!)

### Hint 1: Understanding Effects
Effects are plain JavaScript objects that describe what should happen. They don't actually do anything - they're just descriptions.

```javascript
// Instead of: api.fetchUser(42)
// You write: yield call(api.fetchUser, 42)
```

### Hint 2: Basic Effect Usage
- `call(fn, ...args)` - Call a function with arguments
- `put(action)` - Dispatch a Redux action
- `take(pattern)` - Wait for an action
- `select(selector)` - Read from Redux state

### Hint 3: Exercise 1 Pattern
```javascript
function* fetchUserSaga(userId) {
  const user = yield call(/* function */, /* argument */);
  yield put(/* action creator with user */);
}
```

### Hint 4: Taking Actions
When you `yield take('ACTION_TYPE')`, the saga pauses until that action is dispatched. The `take` effect returns the full action object:
```javascript
const action = yield take('SOME_ACTION');
// action.payload contains the data
```

### Hint 5: Selecting State
The select effect needs a selector function:
```javascript
const value = yield select(state => state.some.path);
// Or for our exercise:
const user = yield select(state => state.user.current);
```

### Hint 6: Conditional Logic
You can use regular JavaScript conditionals with effects:
```javascript
const user = yield select(state => state.user.current);
if (user) {
  yield call(api.saveData, user);
} else {
  yield put(actions.showError("No user found"));
}
```

### Hint 7: Complete Login Flow
```javascript
function* loginFlowSaga() {
  const action = yield take('LOGIN_REQUEST');
  const credentials = action.payload;
  const response = yield call(api.authenticate, credentials);
  yield put(actions.loginSuccess(response.token));
  return response.token;
}
```

## Key Insight
Effects make your sagas testable because you can assert on the effect objects without running the actual side effects. This is the power of declarative programming!