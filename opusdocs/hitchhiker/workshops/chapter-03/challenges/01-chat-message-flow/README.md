# Challenge: Chat Message Flow - Complete Messaging with Optimistic Updates

## Overview
Welcome to the Chat Message Flow challenge! You'll implement a complete messaging system with optimistic updates, error handling, and the sophisticated deduplication pattern used in the zOS codebase. This is where theory meets practice in building real-world features.

## Learning Objectives
- Implement optimistic UI updates with Redux-Saga
- Handle race conditions between local and server state
- Build error recovery with graceful rollback
- Master the deduplication pattern for preventing duplicate messages
- Understand complete async flow orchestration

## Difficulty Level
**Babel Fish Level** (Intermediate)

## Estimated Time
1-2 hours

## Background
In the zOS universe, messages travel through the Matrix at near-light speed. But users expect instant feedback. The solution? Optimistic updates - show the message immediately, then reconcile with reality. But what happens when reality arrives before your optimism? That's the puzzle you'll solve.

## The Challenge
Build a complete chat messaging flow that:
1. Shows messages instantly (optimistic updates)
2. Sends messages to the server
3. Handles the race condition where server responses arrive before optimistic updates
4. Gracefully handles failures with rollback
5. Prevents duplicate messages in all scenarios
6. Manages loading states and error messages

## Real-World Context
This pattern is directly inspired by the zOS messaging system. You'll implement the same deduplication Set pattern and optimistic update flow used in production.

## Getting Started
```bash
cd starter-code
npm install
npm test
```

## Success Criteria
- All tests pass (they're comprehensive!)
- No duplicate messages appear in any scenario
- Failed messages are properly rolled back
- Loading states are correctly managed
- The UI feels instant and responsive

## Key Patterns You'll Use
- Optimistic updates with temporary IDs
- Deduplication using Sets
- Error recovery and rollback
- State normalization
- Saga flow orchestration

## Testing Scenarios
The tests cover:
- Normal message flow
- Server beating optimistic update
- Network failures
- Concurrent messages
- Edge cases and race conditions

## Hints Available
Check `hints.md` if you get stuck, but try to reason through the problems first!

## What You'll Learn
By completing this challenge, you'll understand how production messaging systems handle the complexity of distributed state. This is the same pattern used by WhatsApp, Slack, and zOS.

Remember: In the universe of async operations, optimism is good, but preparation for all timelines is better!