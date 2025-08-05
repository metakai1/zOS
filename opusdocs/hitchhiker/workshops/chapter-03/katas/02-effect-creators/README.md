# Kata: Effect Creators - Your Spellbook for the Async Realm

## Overview
In Redux-Saga, effects are declarative instructions that describe what should happen. Think of them as spells you cast - you describe the spell, and the saga middleware makes it happen.

## Learning Objectives
- Master the basic Redux-Saga effects: `call`, `put`, `take`, `select`
- Understand declarative vs imperative programming in sagas
- Learn how effects make sagas testable
- Practice combining multiple effects

## Difficulty Level
**Towel Level** (Beginner)

## Estimated Time
20-30 minutes

## Background
As the Hitchhiker's Guide says: "The secret to flying is to throw yourself at the ground and miss." The secret to Redux-Saga is to describe what you want to happen and let the middleware handle the how.

## Your Mission
Complete the saga functions in `starter-code/effects.js` using the appropriate Redux-Saga effects. Make all tests pass without actually executing any side effects!

## Getting Started
```bash
cd starter-code
npm install
npm test
```

## Success Criteria
- All tests pass
- You understand why we use effects instead of direct function calls
- You can explain the difference between `call(fn, arg)` and `fn(arg)`

## Key Concepts
- **call**: Invoke functions (like API calls)
- **put**: Dispatch Redux actions
- **take**: Wait for Redux actions
- **select**: Read from Redux state

## Hints Available
Check `hints.md` if you need guidance, but challenge yourself first!

## What You'll Learn
Effects are the heart of Redux-Saga. By the end of this kata, you'll understand why declarative effects make your sagas predictable, testable, and powerful.

Remember: In space, no one can hear you make API calls, but everyone can test your effects!