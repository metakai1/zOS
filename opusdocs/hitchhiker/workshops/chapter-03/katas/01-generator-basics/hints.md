# Hints for Generator Basics Kata

## Progressive Hints (Don't read all at once!)

### Hint 1: Understanding Generator Syntax
Generators are declared with `function*` (note the asterisk). They use `yield` to pause execution and return a value.

```javascript
function* example() {
  yield 'first';
  yield 'second';
}
```

### Hint 2: Simple Generator Structure
For the first exercise, you literally just need three yield statements in a row:
```javascript
function* simpleGenerator() {
  yield /* first value */;
  yield /* second value */;
  yield /* third value */;
}
```

### Hint 3: Countdown Logic
For the countdown, use a while loop that continues while the counter is greater than 0:
```javascript
while (current > 0) {
  yield current;
  current--;
}
```

### Hint 4: Fibonacci Pattern
The Fibonacci sequence starts with 0 and 1. Each subsequent number is the sum of the previous two:
```javascript
let prev = 0;
let curr = 1;
yield prev; // 0
yield curr; // 1
while (true) {
  // Calculate next and update prev/curr
}
```

### Hint 5: Yield Delegation
Use `yield*` (with asterisk) to delegate to another generator:
```javascript
yield 'Hello';
yield* nestedGenerator(); // This yields all values from nestedGenerator
yield 'generator';
```

### Hint 6: Receiving Values
When you assign `yield` to a variable, it receives the value passed to `next()`:
```javascript
const received = yield 'Ready?';
// 'received' will contain whatever was passed to gen.next(value)
yield received * 2;
```

## Still Stuck?

Remember, generators are just functions that can pause. Each `yield` is like pressing pause on a video - the function stops there and remembers where it was. When you call `next()`, it's like pressing play again.

The key insight: generators maintain their state between calls to `next()`. This is what makes them perfect for Redux-Saga!