// Generator Basics - Complete Solution

/**
 * Exercise 1: Create a simple generator that yields three values
 */
function* simpleGenerator() {
  yield "Don't";
  yield "Panic";
  yield 42;
}

/**
 * Exercise 2: Create a countdown generator
 */
function* countdownGenerator(start) {
  let current = start;
  while (current > 0) {
    yield current;
    current--;
  }
}

/**
 * Exercise 3: Create an infinite generator for Fibonacci
 */
function* fibonacciGenerator() {
  let prev = 0;
  let curr = 1;
  
  yield prev; // 0
  yield curr; // 1
  
  while (true) {
    const next = prev + curr;
    yield next;
    prev = curr;
    curr = next;
  }
}

/**
 * Exercise 4: Create a generator that demonstrates yield delegation
 */
function* nestedGenerator() {
  yield 'from';
  yield 'nested';
}

function* delegatingGenerator() {
  yield 'Hello';
  yield* nestedGenerator();
  yield 'generator';
}

/**
 * Exercise 5: Create a generator that receives values
 */
function* interactiveGenerator() {
  const firstValue = yield 'Ready?';
  yield firstValue * 2;
  const secondValue = yield;
  yield secondValue * 3;
}

module.exports = {
  simpleGenerator,
  countdownGenerator,
  fibonacciGenerator,
  delegatingGenerator,
  interactiveGenerator
};