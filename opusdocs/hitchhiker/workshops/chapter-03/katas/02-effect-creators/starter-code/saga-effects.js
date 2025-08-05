// Mock Redux-Saga effects for testing
// These create effect descriptors just like the real Redux-Saga

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

module.exports = {
  call,
  put,
  take,
  select
};