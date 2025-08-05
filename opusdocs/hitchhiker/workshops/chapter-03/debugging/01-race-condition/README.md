# Debugging Quest: Race Condition Fix - When Parallel Universes Collide

## Overview
Welcome to your first debugging quest! In this challenge, you're given broken code with race conditions. Your mission: find the bugs, understand why they happen, and fix them using proper Redux-Saga patterns.

## Learning Objectives
- Identify race conditions in concurrent sagas
- Understand how `takeEvery` vs `takeLatest` affects concurrency
- Master the `race` effect for handling timeouts
- Learn to use `cancel` and `cancelled` for cleanup
- Debug timing-related issues in async flows

## Difficulty Level
**Improbability Drive Level** (Advanced)

## Estimated Time
30-60 minutes

## The Scenario
The Starship Heart of Gold's navigation system is malfunctioning. Multiple navigation requests are causing the ship to jump to random locations. The previous developer (let's call them Zaphod) left this mess, and now it's your job to fix it.

## The Bugs
The code has several race conditions:
1. Multiple search requests overwrite each other
2. Timeout handling doesn't cancel the actual request
3. Loading states get stuck when requests are cancelled
4. Results appear out of order

## Getting Started
```bash
cd starter-code
npm install
npm test # Watch the tests fail!
```

## Your Mission
1. Run the tests to see what's broken
2. Identify the race conditions in the code
3. Fix each issue using appropriate saga patterns
4. Make all tests pass
5. Ensure no memory leaks or dangling operations

## Success Criteria
- All tests pass
- No race conditions remain
- Proper cleanup on cancellation
- Loading states are always accurate
- Results appear in the correct order

## Debugging Tips
- Add console.logs to trace execution order
- Use the Redux DevTools to watch action flow
- Pay attention to which watcher pattern is used
- Consider what happens when actions arrive quickly

## Hints Available
Check `hints.md` for progressive hints, but try debugging first!

## What You'll Learn
Race conditions are one of the hardest bugs to track down. By completing this quest, you'll develop an intuition for concurrent execution and learn to write race-condition-free sagas.

Remember: In space, no one can hear you race... but your users will definitely notice the bugs!