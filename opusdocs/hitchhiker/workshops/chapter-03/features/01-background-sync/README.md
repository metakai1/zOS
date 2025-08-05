# Feature Build: Background Sync System - The Ultimate State Synchronization

## Overview
In this feature build, you'll create a complete background synchronization system inspired by the zOS codebase. This system will periodically sync data with a server, handle conflicts, implement exponential backoff for failures, and maintain consistency across network interruptions.

## Learning Objectives
- Build a production-ready background sync system
- Implement conflict resolution strategies
- Master error boundaries with spawn
- Create exponential backoff with jitter
- Handle offline/online transitions
- Implement proper cleanup and cancellation

## Difficulty Level
**Deep Thought Level** (Expert)

## Estimated Time
2-4 hours

## The Challenge
Build a sync system that:
1. Periodically syncs local changes with the server
2. Handles conflicts using last-write-wins or custom merge strategies
3. Implements exponential backoff for failed syncs
4. Maintains a queue of pending changes during offline periods
5. Provides progress updates and sync status
6. Handles authentication token refresh
7. Implements proper error boundaries so sync failures don't crash the app

## Real-World Context
This is inspired by how apps like Notion, Obsidian, and zOS handle background synchronization. You'll implement patterns used in production applications serving millions of users.

## Architecture Requirements

### Core Components
1. **Sync Queue**: Manages pending changes
2. **Sync Engine**: Orchestrates the sync process
3. **Conflict Resolver**: Handles merge conflicts
4. **Retry Manager**: Implements backoff strategy
5. **Network Monitor**: Detects online/offline state
6. **Progress Reporter**: Provides UI feedback

### Sync Flow
1. Collect local changes into sync queue
2. Check network status
3. Batch changes for efficiency
4. Send to server with conflict detection
5. Handle conflicts or confirmation
6. Update local state
7. Clear processed items from queue

## Getting Started
```bash
cd starter-code
npm install
npm test
```

## Technical Requirements

### Data Structure
```typescript
interface SyncItem {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: 'message' | 'channel' | 'user';
  data: any;
  localVersion: number;
  timestamp: number;
}

interface SyncState {
  queue: SyncItem[];
  isSyncing: boolean;
  lastSyncTime: number;
  failureCount: number;
  nextRetryTime: number;
}
```

### Features to Implement
1. **Automatic Sync**: Every 30 seconds when online
2. **Manual Sync**: User-triggered sync
3. **Offline Queue**: Store changes when offline
4. **Conflict Resolution**: 
   - Last-write-wins for simple conflicts
   - Three-way merge for complex conflicts
5. **Retry Logic**:
   - Exponential backoff: 1s, 2s, 4s, 8s... max 5 minutes
   - Add jitter to prevent thundering herd
6. **Progress Tracking**: Show sync progress in UI
7. **Error Recovery**: Isolate failures, continue syncing other items

## Success Criteria
- All tests pass
- Sync continues working despite individual item failures
- Exponential backoff prevents server overload
- Offline changes are queued and synced when online
- Conflicts are resolved without data loss
- UI always shows accurate sync status
- No memory leaks or zombie sagas

## Advanced Challenges
1. Implement optimistic UI updates with rollback on sync failure
2. Add compression for large sync payloads
3. Implement differential sync (only send changes, not full objects)
4. Add sync analytics and performance monitoring
5. Handle authentication token expiry during sync

## Testing Scenarios
The tests cover:
- Normal sync flow
- Network failures and recovery
- Conflict resolution
- Queue management
- Exponential backoff
- Concurrent sync prevention
- Memory leak detection

## Hints Available
Check `hints.md` for architecture guidance and implementation tips.

## What You'll Learn
This feature build teaches you how to create production-grade sync systems. You'll master advanced saga patterns, error handling, and state management techniques used in real-world applications.

Remember: The answer to life, the universe, and everything may be 42, but the answer to distributed state synchronization is eventual consistency!