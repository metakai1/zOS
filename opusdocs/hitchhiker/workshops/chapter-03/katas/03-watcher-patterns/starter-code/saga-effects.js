// Extended mock Redux-Saga effects for watcher patterns

const call = (fn, ...args) => ({
  '@@redux-saga/IO': true,
  type: 'CALL',
  payload: { fn, args }
});

const put = (action) => ({
  '@@redux-saga/IO': true,
  type: 'PUT',
  payload: { action }
});

const take = (pattern) => ({
  '@@redux-saga/IO': true,
  type: 'TAKE',
  payload: { pattern }
});

const select = (selector, ...args) => ({
  '@@redux-saga/IO': true,
  type: 'SELECT',
  payload: { selector, args }
});

const fork = (fn, ...args) => ({
  '@@redux-saga/IO': true,
  type: 'FORK',
  payload: { fn, args }
});

const cancel = (task) => ({
  '@@redux-saga/IO': true,
  type: 'CANCEL',
  payload: task
});

const cancelled = () => ({
  '@@redux-saga/IO': true,
  type: 'CANCELLED',
  payload: {}
});

const delay = (ms) => ({
  '@@redux-saga/IO': true,
  type: 'CALL',
  payload: {
    fn: () => new Promise(resolve => setTimeout(resolve, ms)),
    args: []
  }
});

module.exports = {
  call,
  put,
  take,
  select,
  fork,
  cancel,
  cancelled,
  delay
};