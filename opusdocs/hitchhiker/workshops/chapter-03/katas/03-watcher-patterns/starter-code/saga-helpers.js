// Mock Redux-Saga helper effects
const { take, fork, cancel } = require('./saga-effects');

const takeEvery = (pattern, worker) => ({
  '@@redux-saga/IO': true,
  type: 'FORK',
  payload: {
    fn: function* () {
      while (true) {
        const action = yield take(pattern);
        yield fork(worker, action);
      }
    },
    args: []
  }
});

const takeLatest = (pattern, worker) => ({
  '@@redux-saga/IO': true,
  type: 'FORK',
  payload: {
    fn: function* () {
      let lastTask;
      while (true) {
        const action = yield take(pattern);
        if (lastTask) {
          yield cancel(lastTask);
        }
        lastTask = yield fork(worker, action);
      }
    },
    args: []
  }
});

const takeLeading = (pattern, worker) => ({
  '@@redux-saga/IO': true,
  type: 'FORK',
  payload: {
    fn: function* () {
      while (true) {
        const action = yield take(pattern);
        yield call(worker, action);
      }
    },
    args: []
  }
});

module.exports = {
  takeEvery,
  takeLatest,
  takeLeading
};