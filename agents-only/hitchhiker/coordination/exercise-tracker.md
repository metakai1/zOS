# Hitchhiker's Guide Exercise Tracker

## Purpose
Track all exercises created across chapters to ensure progression, avoid duplication, and maintain quality.

## Chapter 3: Saga Odyssey

### Katas (Towel Level) - 15-30 min each
1. **Generator Basics** - Understanding generator functions and yield
   - Status: [CREATED]
   - Location: `./opusdocs/hitchhiker/workshops/chapter-03/katas/01-generator-basics/`
   - Skills: Generator syntax, yield expressions, iteration

2. **Effect Creators** - Using call, put, and take effects
   - Status: [CREATED]
   - Location: `./opusdocs/hitchhiker/workshops/chapter-03/katas/02-effect-creators/`
   - Skills: Redux-Saga effects, declarative programming

3. **TakeEvery vs TakeLatest** - Understanding watcher patterns
   - Status: [CREATED]
   - Location: `./opusdocs/hitchhiker/workshops/chapter-03/katas/03-watcher-patterns/`
   - Skills: Event handling patterns, concurrency control

### Challenges (Babel Fish Level) - 1-2 hours each
1. **Chat Message Flow** - Complete messaging with optimistic updates
   - Status: [CREATED]
   - Location: `./opusdocs/hitchhiker/workshops/chapter-03/challenges/01-chat-message-flow/`
   - Skills: Optimistic updates, error handling, state management

2. **File Upload Progress** - Upload with progress tracking
   - Status: [CREATED]
   - Location: `./opusdocs/hitchhiker/workshops/chapter-03/challenges/02-file-upload-progress/`
   - Skills: Progress channels, fork/cancel, resource cleanup

3. **Auth Flow** - Login with token refresh
   - Status: [CREATED]
   - Location: `./opusdocs/hitchhiker/workshops/chapter-03/challenges/03-auth-flow/`
   - Skills: Token management, race conditions, background tasks

### Debugging Quests (Improbability Drive Level) - 30-60 min each
1. **Race Condition Fix** - Fix concurrent saga race conditions
   - Status: [CREATED]
   - Location: `./opusdocs/hitchhiker/workshops/chapter-03/debugging/01-race-condition/`
   - Skills: Race effect, timing issues, state consistency

2. **Infinite Loop Debug** - Debug and fix watcher loops
   - Status: [CREATED]
   - Location: `./opusdocs/hitchhiker/workshops/chapter-03/debugging/02-infinite-loop/`
   - Skills: While loops, memory leaks, proper cleanup

3. **Memory Leak Hunt** - Find and fix uncancelled forks
   - Status: [CREATED]
   - Location: `./opusdocs/hitchhiker/workshops/chapter-03/debugging/03-memory-leak/`
   - Skills: Fork/spawn lifecycle, cancellation, resource management

### Feature Builds (Deep Thought Level) - 2-4 hours
1. **Background Sync System** - Complete sync with conflict resolution
   - Status: [CREATED]
   - Location: `./opusdocs/hitchhiker/workshops/chapter-03/features/01-background-sync/`
   - Skills: Scheduled tasks, error boundaries, state sync

2. **Multi-Step Form** - Form with validation and rollback
   - Status: [CREATED]
   - Location: `./opusdocs/hitchhiker/workshops/chapter-03/features/02-multi-step-form/`
   - Skills: Transaction patterns, rollback, complex state flows

3. **Real-time Collaboration** - Collaborative editor with conflict resolution
   - Status: [CREATED]
   - Location: `./opusdocs/hitchhiker/workshops/chapter-03/features/03-realtime-collab/`
   - Skills: Event channels, CRDT concepts, optimistic updates

## Exercise Quality Metrics
- Clear learning objectives: ✓
- Progressive difficulty: ✓
- Real-world relevance: ✓
- Test coverage: ✓
- Solution quality: ✓
- Time estimates validated: ✓

## Cross-Chapter Dependencies
- Chapter 3 exercises build on Redux concepts from Chapter 2
- Prepare students for Matrix integration in Chapter 4
- Use patterns consistent with zOS codebase