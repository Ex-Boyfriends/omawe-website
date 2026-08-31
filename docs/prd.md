# Trip Tracker — Live Group Trip Awareness

## Problem Statement

Coordinating a group trip today is a manual, high-friction process. Travelers repeatedly open Maps, refresh locations, send "where are you?" texts, and estimate arrival times by hand because there is no shared, glanceable view of where everyone actually is. This happens on nearly every group ride or meetup with more than two people, and the cost compounds with group size: constant interruption, inaccurate self-reported ETAs (the "I'm 5 minutes away" lie), and wasted time waiting on people who haven't left yet. The result is stress and friction at exactly the moment a trip should feel easy.

## Goals

1. **Cut "where are you" messaging** — reduce the number of manual status-check messages sent during an active trip by a target amount, measured via in-app trip chat/message volume during tracked trips vs. self-reported baseline.
2. **Make status glanceable, not app-bound** — users can understand full trip status (who's arrived, who's close, who's delayed) in under 2 seconds from the Lock Screen via Live Activities, without unlocking the phone.
3. **Minimize app dependency** — the built-in map should only be opened when a user intentionally wants navigation, not to check on others.
4. **Drive repeat usage** — users who complete one tracked trip return to use the app on a subsequent trip within 30 days.
5. **Deliver a premium, trustworthy feel** — location updates, animations, and haptics should read as polished rather than merely functional (qualitative, assessed via user feedback/NPS-style pulse after trips).

## Non-Goals

1. **Android v1 support** — v1 ships iOS-only to take full advantage of Live Activities/ActivityKit. Android parity (via an equivalent widget system) is a fast-follow, not part of this release, because building both simultaneously would dilute the core iOS experience this concept depends on.
2. **Turn-by-turn in-app navigation** — the app is not replacing Maps/Waze for actual driving directions. It only tracks progress and shares status; opening a native maps app for directions is expected and fine.
3. **Permanent/always-on location sharing** — this is scoped to time-boxed, trip-specific sharing, not a persistent friend-location product like Life360. Always-on sharing raises materially different privacy and battery tradeoffs and is a separate initiative if pursued.
4. **Multi-destination / multi-leg trip planning** — v1 assumes one shared destination per trip. Complex itineraries with multiple stops are a future consideration, not required for the core "are we all converging on one place" use case.
5. **In-app messaging/chat as a core feature** — the product's premise is reducing messaging, not building a better chat. Any lightweight status reactions are secondary to location/ETA display, not a chat replacement.

## User Stories

**Trip organizer**
- As a trip organizer, I want to create a shared destination and invite my group so that everyone's progress is tracked against the same target.
- As a trip organizer, I want to see all participants' ETAs and status on one glanceable screen so that I know exactly when to leave or whether to wait.
- As a trip organizer, I want to be notified when someone is significantly delayed so that I can adjust plans without having to ask.

**Trip participant**
- As a participant, I want my progress toward the destination to show up automatically on my Lock Screen via Live Activity so that I don't have to open the app to update others.
- As a participant, I want clear, minimal prompts about why my location is being shared and for how long so that I feel in control of my privacy.
- As a participant, I want sharing to end automatically when the trip is over so that I'm not tracked indefinitely.
- As a participant, I want the app to work reasonably well even with spotty signal (tunnels, parking garages) so that my status doesn't look wrong or stale to the group.

**Edge cases**
- As a participant, I want to see an honest "last known location, X minutes ago" state when GPS or network drops, rather than a misleading live-looking indicator.
- As an organizer, I want to see when someone hasn't started sharing yet (declined permissions, hasn't opened invite) so I know who's missing from the picture.
- As a participant, I want to manually pause or stop sharing my location mid-trip if I change my mind.

## Requirements

### Must-Have (P0)
1. **Create/join a trip with a shared destination.**
   - Acceptance criteria: organizer can set a destination and invite participants via invite code or link; participants can join without needing an account beyond minimal onboarding. Note: the currently shipped join path is a 6-character invite code against the Go backend — a deep-linked share flow (`CKShare`-based today) is planned but not yet migrated. See Migration Status Summary below.
2. **Live Activity showing per-participant progress/ETA on the Lock Screen and Dynamic Island.**
   - Acceptance criteria: Given a participant has joined and enabled sharing, when they're en route, then their status (en route / delayed / arrived) and ETA update on the Live Activity within system-supported refresh constraints.
3. **Time-boxed, explicit location sharing with clear consent.**
   - Acceptance criteria: sharing requires explicit opt-in per trip; permission prompts state duration and purpose; sharing auto-ends when the trip is marked complete or after a max duration.
4. **Graceful degradation under poor connectivity/GPS.**
   - Acceptance criteria: when location/network is stale beyond a threshold, UI shows "last seen X ago" rather than a live-looking but inaccurate status.
5. **Battery-conscious background location updates.**
   - Acceptance criteria: background location and Live Activity update frequency are tuned to avoid significant battery drain over a typical trip duration (target defined during implementation with engineering).
6. **Manual stop-sharing control.**
   - Acceptance criteria: participant can end their own sharing at any time from the Live Activity or app, immediately reflected to the group.

### Nice-to-Have (P1)
1. **Delay/traffic-aware status ("stuck in traffic" vs. "running late by choice").**
2. **Push notification when a participant is significantly behind schedule or has arrived.**
3. **Lightweight status reactions (e.g., "on my way," "5 min") as a fallback for edge cases the automated system can't infer.**
4. **Trip history / past trips list.**

### Future Considerations (P2)
1. **Android support via equivalent widget/notification system.**
2. **Multi-stop / multi-leg trips.**
3. **Persistent friend groups for recurring trips (e.g., regular carpool) without recreating a trip each time.**
4. **Integration with calendar events to auto-suggest trip creation.**

## Success Metrics

**Leading indicators**
- % of invited participants who enable location sharing (activation rate) — target defined post-baseline.
- Time from Lock Screen glance to understanding trip status: target under 2 seconds, assessed via usability testing.
- In-trip manual status-check messages sent (via any in-app messaging, if present, or self-reported survey) — target meaningful reduction vs. baseline.
- Live Activity engagement rate (% of trips where the Live Activity is actively viewed/interacted with).

**Lagging indicators**
- Repeat usage: % of users who track a second trip within 30 days of their first.
- Qualitative trust/delight signal via post-trip pulse survey.
- Battery complaint rate / uninstalls attributable to battery drain (via reviews/support).

**Evaluation window:** initial review at 2026-07-10, with a fuller readout once meaningful trip volume has accumulated post-launch (30/60/90-day checkpoints recommended).

## Open Questions

1. What is the acceptable battery drain budget for a multi-hour trip, and how is it measured/tested? (engineering)
2. What's the fallback experience for participants who decline location permissions but still want to be part of the trip roster? (design)
3. How should the product communicate the GoLang backend's sync/propagation delays to users without eroding trust in the "real-time" promise? (design, engineering)
4. What's the maximum group size v1 needs to support well, and does that change the sync/architecture approach? (engineering)
5. Does time-boxed background location sharing require any additional App Store review scrutiny or disclosure beyond standard "when in use" flows? (legal/App Store compliance — blocking, should be resolved before submission)
6. What specific target numbers back the reduction-in-messaging and activation-rate goals above? (stakeholder — needs a baseline or comparable benchmark before targets can be finalized)
7. The Go backend migration is currently a hybrid state, not a full cutover: auth, user profiles, and core trip create/list/status/join are live on Go, but member management (remove/leave/ownership reassignment), live location sync, and share-link acceptance still run on CloudKit (see Migration Status Summary below). Should P0 acceptance testing account for this mixed state, or is full cutover a prerequisite for the next evaluation checkpoint? (engineering, product)

## Migration Status Summary (Go Backend vs. CloudKit)

The app is running as a hybrid system: some domains are fully served by the Go + PostgreSQL backend, others still run on the legacy CloudKit path. This section is the single source of truth for that split — no separate reconciliation doc needed.

| Domain | Backend | Status |
| :--- | :--- | :--- |
| Auth (Sign in with Apple, session, refresh, logout) | Go | **Done** |
| User profile (get/update, public lookup) | Go | **Done** |
| Trip create / list / status update | Go | **Done, hybrid** — see Risk 1 below |
| Invitation preview & join by code | Go | **Done** |
| Trip membership (list / remove / leave / ownership reassignment) | CloudKit | **Not migrated** — no members handler/service/repository on the Go side yet |
| Live location tracking (publish + fetch latest) | CloudKit | **Not migrated** — no location handler/service on the Go side yet |
| Trip sharing / `CKShare` deep-link acceptance | CloudKit | **Not migrated** — invite code is the only Go-backed join path |
| Push notifications (delay/arrival alerts to other devices) | Neither | **Not started** — local on-device banners only; P1, not blocking P0 |
| Live Activity / Dynamic Island | Device-only | **Unaffected by backend choice** |

**What this means for P0 requirements:**
- P0-1 (create/join trip "via link"): only the invite-code path is Go-backed today; the literal share-link flow is still `CKShare`. Treat "link" in acceptance criteria as a deep link wrapping the code, not a CloudKit share URL, until that flow migrates.
- P0-2 (Live Activity progress/ETA): depends on `TripStatusViewModel` reading live location, which is still 100% CloudKit — so this P0 requirement's runtime dependency is CloudKit, not Go, regardless of what the rest of the PRD implies.
- P0-3 (time-boxed sharing, auto-ends on trip completion): trip status transitions are Go-enforced, but actually stopping location publication is client-driven, same as before migration — not a backend guarantee.
- Member-management stories (remove participant, leave + reassign owner): still fully client-side/CloudKit, including the race-condition-prone ownership reassignment the original architecture audit flagged as a reason to migrate.

**Known hybrid-state risks:**
1. **Dual writes on trip status** — start/end trip writes to both Go and CloudKit (CloudKit write is best-effort); if they disagree, devices can show inconsistent trip state.
2. **Trip identifier is still CloudKit-shaped** — the Go backend returns a UUID, but iOS wraps it as a `CKRecord.ID` so the rest of the codebase keeps working, meaning the canonical trip ID type never actually left CloudKit's model.
3. **Split source of truth** — trip metadata is Go-sourced while participants and locations are CloudKit-sourced, with no shared transaction boundary between them.
4. **User identity fallback chain** — identity resolution prefers a cached Go `backend_user_id` and silently falls back to `CloudKitIdentityService` if that's missing, which can mask migration bugs.

**Recommended follow-ups:** re-scope/re-test P0 against this mixed state rather than assuming full cutover; prioritize remaining engineering time on live location, membership/ownership transactions, and push (the higher-risk pieces still outstanding) over re-validating what's already migrated.

## Timeline Considerations

- **Target evaluation checkpoint:** 2026-07-10 — treat this as the first readout date, not necessarily a launch date; confirm with stakeholders whether this is meant as a launch deadline or a metrics review date.
- **Dependency:** the GoLang backend's real-time sync architecture (e.g., WebSocket/polling design for location updates) may require early technical spikes before UI/UX work can be finalized. This is partially underway: auth, user profiles, and core trip create/list/status/join are already migrated and running on Go. The remaining, higher-risk spike work is member management (remove/leave/ownership reassignment), live location ingestion, and share-link acceptance, which still run on CloudKit today — prioritize timeboxing those before treating the backend migration as done.
- **Dependency:** App Store review for background/continuous location usage can introduce approval delays; privacy disclosure copy and permission flows should be finalized well before submission, not treated as launch-week polish.
- **Phasing suggestion:** ship iOS-only P0 scope first; treat delay/traffic-aware status, notifications, and trip history (P1) as a fast-follow release rather than blocking initial launch.
