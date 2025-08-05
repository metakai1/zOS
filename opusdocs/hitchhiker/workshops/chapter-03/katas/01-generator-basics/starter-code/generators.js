// Generator Basics - Your First Steps into the Saga Dimension

/**
 * Exercise 1: Create a simple generator that yields three values
 * 
 * Your generator should yield:
 * 1. The string "Don't"
 * 2. The string "Panic"
 * 3. The number 42
 */
function* simpleGenerator() {
  // TODO: Implement this generator
  // Hint: Use yield three times
}

/**
 * Exercise 2: Create a countdown generator
 * 
 * This generator should count down from the given number to 1
 * Example: countdownGenerator(3) yields 3, then 2, then 1
 */
function* countdownGenerator(start) {
  // TODO: Implement countdown logic
  // Hint: Use a while loop with yield inside
}

/**
 * Exercise 3: Create an infinite generator
 * 
 * This generator should yield fibonacci numbers infinitely
 * Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, ...
 */
function* fibonacciGenerator() {
  // TODO: Implement infinite fibonacci sequence
  // Hint: You'll need two variables to track previous values
}

/**
 * Exercise 4: Create a generator that demonstrates yield delegation
 * 
 * This generator should:
 * 1. Yield 'Hello'
 * 2. Delegate to another generator that yields 'from' and 'nested'
 * 3. Yield 'generator'
 */
function* nestedGenerator() {
  yield 'from';
  yield 'nested';
}

function* delegatingGenerator() {
  // TODO: Implement with yield and yield*
  // Hint: yield* delegates to another generator
}

/**
 * Exercise 5: Create a generator that receives values
 * 
 * This generator should:
 * 1. Yield 'Ready?'
 * 2. Receive a value and yield it back doubled
 * 3. Receive another value and yield it back tripled
 */
function* interactiveGenerator() {
  // TODO: Implement generator that uses yield to receive values
  // Hint: const received = yield 'Ready?'
}

module.exports = {
  simpleGenerator,
  countdownGenerator,
  fibonacciGenerator,
  delegatingGenerator,
  interactiveGenerator
};