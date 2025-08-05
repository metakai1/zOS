# Kata: Watcher Patterns - TakeEvery vs TakeLatest vs TakeLeading

## Overview
In the saga universe, watchers are like cosmic observers that monitor for specific actions and trigger sagas in response. Understanding the difference between `takeEvery`, `takeLatest`, and `takeLeading` is crucial for handling concurrent actions correctly.

## Learning Objectives
- Master the three main watcher patterns in Redux-Saga
- Understand when to use each pattern
- Learn how concurrency affects saga execution
- Practice implementing custom watcher patterns

## Difficulty Level
**Towel Level** (Beginner)

## Estimated Time
25-30 minutes

## Background
Imagine you're at the Restaurant at the End of the Universe. Multiple customers are ordering Pan Galactic Gargle Blasters simultaneously. How do you handle these concurrent orders?
- **takeEvery**: Make every drink ordered (handle all)
- **takeLatest**: Only make the most recent order (cancel previous)
- **takeLeading**: Make the first order, ignore others until done

## Your Mission
Implement different watcher patterns in `starter-code/watchers.js` to handle concurrent actions appropriately. Understand why each pattern exists and when to use it.

## Getting Started
```bash
cd starter-code
npm install
npm test
```

## Success Criteria
- All tests pass
- You understand the concurrency behavior of each pattern
- You can explain when to use each watcher type
- You've implemented a custom watcher pattern

## Real-World Scenarios
- **takeEvery**: Logging, analytics, independent operations
- **takeLatest**: Search autocomplete, data fetching
- **takeLeading**: Form submission, payment processing

## Hints Available
Check `hints.md` if you need help understanding the patterns!

## What You'll Learn
By mastering watcher patterns, you'll be able to handle any concurrent scenario elegantly. No more race conditions, no more duplicate API calls, just clean, predictable async flow.

Remember: The universe is concurrent, and so is your application!