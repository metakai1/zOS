# Chapter 3: Saga Odyssey - Visual Diagrams

## Saga Effect Flow - The Cosmic Orchestra

```
┌─────────────┐      ┌─────────────────────┐      ┌──────────────┐
│   Action    │      │                     │      │    Store     │
│  Dispatch   │─────▶│    Redux-Saga      │─────▶│   Update     │
└─────────────┘      │  (Cosmic Center)    │      └──────┬───────┘
                     │                     │             │
                     │  ┌───────────────┐  │             │
                     │  │   Watcher     │  │             ▼
                     │  │   Sagas       │  │      ┌──────────────┐
                     │  └───────┬───────┘  │      │  Component   │
                     │          │          │      │   Re-render  │
                     │          ▼          │      └──────────────┘
                     │  ┌───────────────┐  │
                     │  │    Worker     │  │
                     │  │    Sagas      │  │
                     │  └───────┬───────┘  │
                     │          │          │
                     │          ▼          │
                     │  ┌───────────────┐  │
                     │  │   Effects:    │  │
                     │  │ • call()      │  │
                     │  │ • put()       │  │
                     │  │ • take()      │  │
                     │  │ • fork()      │  │
                     │  │ • spawn()     │  │
                     │  │ • race()      │  │
                     │  │ • select()    │  │
                     │  └───────────────┘  │
                     └─────────────────────┘
```

## Watcher Pattern Comparison - The Three Conductors

### takeEvery - The Enthusiastic Conductor
```
Actions:    A1──A2──A3──A4──A5────────▶ Time
            │   │   │   │   │
Workers:    W1  W2  W3  W4  W5
            │   │   │   │   │
Complete:   ────C1──C2──C3──C4──C5───▶

Every action spawns a new worker. All run in parallel!
```

### takeLatest - The Perfectionist Conductor
```
Actions:    A1──A2──A3──A4──A5────────▶ Time
            │   ❌  ❌  ❌  │
Workers:    W1              W5
            │               │
Complete:   ────────────────C5────────▶

New actions cancel previous workers. Only latest completes!
```

### takeLeading - The Patient Conductor
```
Actions:    A1──A2──A3──A4──A5────────▶ Time
            │   ⏸️  ⏸️  ⏸️  ⏸️
Workers:    W1──────────────│
            │               │
Complete:   ─────────C1─────│─────────▶

First action blocks others until complete!
```

## Spawn Error Boundary - The Parallel Universes

```
┌─────────────── ROOT SAGA UNIVERSE ───────────────┐
│                                                  │
│  ┌──────────────┐  ┌──────────────┐            │
│  │   Universe   │  │   Universe   │            │
│  │      A       │  │      B       │            │
│  │  (spawned)   │  │  (spawned)   │            │
│  │              │  │              │            │
│  │  ┌────────┐  │  │  ┌────────┐  │            │
│  │  │ Tasks  │  │  │  │ Tasks  │  │            │
│  │  └────────┘  │  │  └────────┘  │            │
│  │              │  │              │            │
│  │  💥 ERROR!   │  │     ✅ OK    │            │
│  │  (isolated)  │  │  (continues) │            │
│  └──────────────┘  └──────────────┘            │
│                                                  │
│  Root saga continues! Other universes safe! 🛡️   │
└──────────────────────────────────────────────────┘

spawn() = New universe (isolated)
fork() = Same universe (error propagates)
```

## Event Bus Architecture - The Quantum Communication

```
┌─────────────────────────────────────────────────────┐
│                  EVENT BUS (Multicast Channel)      │
│  ┌─────────────────────────────────────────────┐   │
│  │                                             │   │
│  │  📡 ←─────── 📡 ←─────── 📡 ←─────── 📡    │   │
│  │   ↓           ↓           ↓           ↓     │   │
│  └─────────────────────────────────────────────┘   │
│      ↓           ↓           ↓           ↓         │
│  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐      │
│  │ Saga  │  │ Saga  │  │ Saga  │  │ Saga  │      │
│  │  A    │  │  B    │  │  C    │  │  D    │      │
│  └───────┘  └───────┘  └───────┘  └───────┘      │
│                                                     │
│  One event → Multiple listeners                     │
│  Decoupled communication                            │
└─────────────────────────────────────────────────────┘
```

## Race with Progress - The Quantum Race

```
┌─────── RACE START ───────┐
│                          │
│    🏁 User Action        │
│           │              │
│    ┌──────┴──────┐       │
│    ▼             ▼       │
│  FORK 1        FORK 2    │
│  Loading       Actual    │
│  Animation     Work      │
│    │             │       │
│    │ (100ms)    │       │
│    ▼             │       │
│  Show           │       │
│  Spinner        │       │
│    │             ▼       │
│    │          Complete   │
│    │             │       │
│    └─────┬───────┘       │
│          ▼               │
│     CANCEL LOSER         │
│     Hide Spinner         │
│                          │
└──────────────────────────┘

Either work completes OR timeout shows spinner
Winner cancels loser!
```

## Optimistic Update Timeline - The Time Travel

```
Timeline ──────────────────────────────────────────────────▶

T0: User clicks "Send"
    │
    ├─→ Optimistic Update
    │   └─→ UI shows message immediately ✨
    │
    └─→ API Request
        └─→ Server processing...

T1: Local state updated
    [Store: messages = [...old, optimisticMsg]]

T2: Server responds
    │
    ├─→ Success: Replace optimistic with real
    │   └─→ [Deduplicate by tempId → realId]
    │
    └─→ Failure: Rollback
        └─→ [Remove optimistic, show error]

The Deduplication Magic:
┌────────────────┐    ┌────────────────┐
│ Optimistic Msg │───▶│  Server Msg    │
│ tempId: tmp123 │    │ id: real456    │
│ status: sending│    │ status: sent   │
└────────────────┘    └────────────────┘
         └──── Merged by matching content ────┘
```

## Matrix Event Processing - The Event Horizon

```
┌─────────────────────────────────────────────────────┐
│                 MATRIX EVENT STREAM                  │
│  ┌─────────────────────────────────────────────┐   │
│  │ E1 → E2 → E3 → E4 → E5 → E6 → E7 → E8 → ... │   │
│  └─────────────┬───────────────────────────────┘   │
│                │                                     │
│         ┌──────▼──────┐                            │
│         │   Buffer    │                            │
│         │   Queue     │                            │
│         │ [][][][][] │                            │
│         └──────┬──────┘                            │
│                │                                     │
│         ┌──────▼──────┐                            │
│         │   Event     │                            │
│         │  Channel    │                            │
│         └──────┬──────┘                            │
│                │                                     │
│    ┌───────────┴───────────┐                       │
│    ▼           ▼           ▼                       │
│ Process     Process    Process                     │
│ Message      Typing     Presence                   │
│  Saga        Saga       Saga                       │
└─────────────────────────────────────────────────────┘

Events queued during init → No events lost!
```

## Background Task Scheduling - The Eternal Loop

```
┌─────────────── SCHEDULER SAGA ──────────────┐
│                                             │
│  START ──┐                                  │
│          ▼                                  │
│     ┌────────┐                             │
│  ┌─▶│ DELAY  │ (configurable interval)     │
│  │  └───┬────┘                             │
│  │      ▼                                  │
│  │  ┌────────┐                             │
│  │  │ CHECK  │ → Any tasks pending?        │
│  │  └───┬────┘                             │
│  │      ▼                                  │
│  │  ┌────────┐     ┌─────────┐            │
│  │  │PROCESS │────▶│ CLEANUP │            │
│  │  └────────┘     │ EXPIRED │            │
│  │                 └─────────┘            │
│  │                                         │
│  └─────────────────────────────────────────┘
│                                             │
│  Runs forever (while(true))                │
│  Cancelled only on logout/unmount          │
└─────────────────────────────────────────────┘
```

---

These diagrams visualize the key saga patterns discovered in the zOS codebase, helping readers understand the "cosmic choreography" of asynchronous operations in Redux-Saga.