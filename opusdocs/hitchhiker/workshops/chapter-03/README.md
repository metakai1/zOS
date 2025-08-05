# Chapter 3 Workshops: Saga Odyssey

Welcome to the hands-on exercises for Chapter 3! These workshops will take you from saga novice to async master through progressive challenges.

## Workshop Structure

### 🏊 Katas (Towel Level) - 15-30 min each
Quick, focused exercises to build fundamental skills:

1. **Generator Basics** (`katas/01-generator-basics/`)
   - Master generator function syntax
   - Understand yield and iteration
   - Foundation for all saga concepts

2. **Effect Creators** (`katas/02-effect-creators/`)
   - Learn the saga effect vocabulary
   - Practice with call, put, take, select
   - Understand declarative vs imperative

3. **Watcher Patterns** (`katas/03-watcher-patterns/`)
   - Compare takeEvery, takeLatest, takeLeading
   - Understand concurrency implications
   - Build custom watcher patterns

### 🌊 Challenges (Babel Fish Level) - 1-2 hours each
Real-world scenarios with moderate complexity:

1. **Chat Message Flow** (`challenges/01-chat-message-flow/`)
   - Implement optimistic updates
   - Handle race conditions
   - Build production-ready messaging

2. **File Upload Progress** (`challenges/02-file-upload-progress/`)
   - Track upload progress with channels
   - Implement cancellation
   - Handle multiple concurrent uploads

3. **Auth Flow** (`challenges/03-auth-flow/`)
   - Build login with token refresh
   - Handle token expiry gracefully
   - Implement secure logout

### 🔍 Debugging Quests (Improbability Drive Level) - 30-60 min each
Fix broken code to learn common pitfalls:

1. **Race Condition Fix** (`debugging/01-race-condition/`)
   - Identify timing bugs
   - Fix concurrent request issues
   - Master proper cancellation

2. **Infinite Loop Debug** (`debugging/02-infinite-loop/`)
   - Find the runaway saga
   - Fix watcher patterns
   - Prevent memory leaks

3. **Memory Leak Hunt** (`debugging/03-memory-leak/`)
   - Track down uncancelled tasks
   - Fix resource cleanup
   - Implement proper lifecycle

### 🚀 Feature Builds (Deep Thought Level) - 2-4 hours
Build complete production features:

1. **Background Sync System** (`features/01-background-sync/`)
   - Periodic data synchronization
   - Conflict resolution
   - Exponential backoff

2. **Multi-Step Form** (`features/02-multi-step-form/`)
   - Transaction-like form handling
   - Validation and rollback
   - Progress persistence

3. **Real-time Collaboration** (`features/03-realtime-collab/`)
   - Live collaborative editing
   - Conflict-free updates
   - Presence indicators

## Getting Started

Each exercise includes:
- **README.md**: Overview and objectives
- **starter-code/**: Skeleton code to complete
- **tests/**: Comprehensive test suite
- **hints.md**: Progressive hints (use sparingly!)

Solutions are available separately for instructors.

## Learning Path

### Beginner Path
1. Start with all three katas in order
2. Try the Chat Message Flow challenge
3. Debug the Race Condition quest

### Intermediate Path
1. Jump to Effect Creators kata
2. Complete all three challenges
3. Try at least one debugging quest

### Advanced Path
1. Skip katas or use as warm-up
2. Go straight to feature builds
3. Try to implement without hints

## Tips for Success

1. **Read the tests first** - They define the expected behavior
2. **Use console.log liberally** - Trace saga execution
3. **Think declaratively** - Describe what, not how
4. **Handle errors gracefully** - Every saga can fail
5. **Clean up resources** - Cancel tasks, close channels

## Need Help?

- Each exercise has progressive hints
- Reference the Chapter 3 narrative for concepts
- Check the zOS codebase for real examples
- Remember: Effects are just objects!

Happy coding, and Don't Panic! 🚀