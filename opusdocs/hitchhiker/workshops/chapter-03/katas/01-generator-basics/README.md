# Kata: Generator Basics - Your First Steps into the Saga Dimension

## Overview
Welcome to your first encounter with generator functions! Like learning to use a towel in the Hitchhiker's Guide, mastering generators is essential for your journey through Redux-Saga.

## Learning Objectives
- Understand generator function syntax and the `function*` declaration
- Master the `yield` keyword and its behavior
- Learn to iterate through generator values
- Grasp the concept of lazy evaluation

## Difficulty Level
**Towel Level** (Beginner)

## Estimated Time
15-30 minutes

## Background
In Douglas Adams' universe, improbability drives make the impossible possible. In JavaScript, generators make the asynchronous synchronous (sort of). They're functions that can pause and resume, maintaining their state between pauses.

## Your Mission
Complete the generator functions in `starter-code/generators.js` to make all tests pass. Each function explores a different aspect of generators.

## Getting Started
```bash
cd starter-code
npm install
npm test
```

## Success Criteria
- All tests pass
- You understand why generators pause at each `yield`
- You can explain the difference between `generator.next()` and regular function calls

## Hints Available
Check `hints.md` if you get stuck, but try to solve it yourself first!

## What You'll Learn
By the end of this kata, you'll understand:
1. How generators differ from regular functions
2. The power of `yield` for controlling execution flow
3. Why generators are perfect for handling async operations in Redux-Saga

Remember: Don't Panic! Generators might seem weird at first, but they're just functions that learned how to take breaks.