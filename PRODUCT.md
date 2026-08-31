# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

_(The marketing site is web. The product it markets, Omawe, is iOS-only in v1 — see Capabilities and Constraints.)_

## Users

**Primary:** people traveling to one shared destination as a group — carpools, group rides, meetups. The situation is mid-trip and hands-busy: driving, riding, or waiting. The job is knowing where everyone actually is without asking, and without unlocking the phone.

Two roles inside the same group:

- **Trip organizer** — creates the destination, invites the group, decides when to leave or whether to wait.
- **Trip participant** — joins, shares location for the trip's duration, wants their status broadcast without doing anything.

**Site visitor:** someone who heard about Omawe or received an invite link, on iPhone, deciding in under a minute whether to install a beta build.

## Product Purpose

Omawe replaces the "where are you?" text thread with a shared, glanceable view of a group converging on one destination. Success is a group that stops asking — status is understood from the Lock Screen in under two seconds, without opening the app.

## Positioning

The mechanism is **the Live Activity, not the map**. Omawe's goal is for you not to open it: participant progress, ETA, and arrival state render on the Lock Screen and Dynamic Island via ActivityKit, so checking on the group costs a glance rather than an app switch.

That is paired with a deliberate scope refusal: sharing is **time-boxed to the trip**, not persistent friend-location. Sharing requires per-trip opt-in and ends when the trip ends. Products in the neighboring category (Life360 and similar) are built on always-on sharing and could not truthfully claim this.

## Operating Context

- Trips are created with one shared destination; participants join with a 6-character invite code (deep links via `https://omaweapp.my.id/join?code=ABC123`).
- The trip runs in the background. The expected interaction is *no interaction* — glance at the Lock Screen, act on it.
- Opening the in-app map is intentional (someone wants navigation), not the status-checking path.
- Real conditions include tunnels, parking garages, and dead signal. Stale state is shown honestly as "last seen X ago" rather than a live-looking indicator.
- The website also hosts the privacy policy and must keep serving `/join` and `/.well-known/apple-app-site-association` from the Go backend for Universal Links.

## Capabilities and Constraints

**Confirmed and shipped:**

- Create/join a trip with a shared destination; join by 6-character invite code.
- Live Activity on Lock Screen and Dynamic Island with per-participant status and ETA.
- Time-boxed location sharing with explicit per-trip opt-in; manual stop-sharing at any time.
- Graceful degradation on poor GPS/connectivity ("last seen X ago").
- Battery-conscious background location (CoreLocation, 25m distance filter).
- Sign in with Apple.

**Explicit non-goals — the site must never imply these exist:**

- Android. v1 is iOS-only (iOS 17.0+, ActivityKit dependency).
- Turn-by-turn navigation. Omawe tracks progress; Maps/Waze still do the driving.
- Always-on/persistent location sharing.
- Multi-stop or multi-leg trips. One destination per trip.
- In-app chat. The premise is less messaging, not better messaging.

**Not yet built (must not be claimed):** push notifications for delay/arrival (local on-device banners only), trip history, traffic-aware delay status.

**Distribution status:** TestFlight beta, live at `https://testflight.apple.com/join/9b4DaTtE`. **Not on the App Store.** No store badge, no "Download on the App Store", no ratings or install counts.

**Stack:** Next.js 16 (App Router) + Tailwind CSS v4. Product is Swift/SwiftUI + a Go/PostgreSQL backend.

## Brand Commitments

- **Name:** Omawe. Bundle `com.exboyfriends.omaweapp`. Domain `omaweapp.my.id`.
- **Brand colors, binding** (from `Omawe/Assets.xcassets`): `Primary #03B9D6`, `PrimarySoft #7AE8FF`. Already tokenized in `src/app/globals.css` as `--gradient-brand-base`.
- **Status color system, binding:** in-trip `#34DA71 → #77FFA9`; has-trip `#01C9B4 → #49FFEC`; Dynamic Island variants are the same hues resolved from black.
- **Logo, binding:** a 3D ice-blue ring — an "O" — broken by a checkered finish flag, on a dark map-grid ground. Ring = the group; flag = the shared destination. Confirmed by the user as the Omawe logo. Shipped at `public/omawe-icon.webp`, with `src/app/icon.png` and `apple-icon.png` as the favicon set, all derived from the iOS app icon. It carries its own dark ground, so it needs no plate behind it. The grid behind it carries a plus-pattern texture, tokenized as `--pattern-plus`.
- **Typeface:** SF Pro. The site is meant to read as an extension of iOS.
- **Site ground: light.** The user directed the marketing site to a light ground. The dark surfaces that remain on it are *devices* — the Live Activity and Dynamic Island — not a dark theme, because a Lock Screen is black. Do not reinterpret this as a dark-mode site.
- **Brand cyan on paper:** `#03B9D6` only reaches 2.1:1 on the light ground, so brand marks drawn on the page use `--rb-brand-ink` (`#0284A0`, 3.9:1). The bright cyan is reserved for the dark device surfaces.

## Evidence on Hand

- App icon, 1024px: `../Omawe/apps/ios/Omawe/Assets.xcassets/AppIcon.appiconset/`
- Live Activity design render: `../Omawe/apps/ios/Omawe/Assets.xcassets/LiveActivity.imageset/LiveActivity.png` — black card, cyan border, ETA + Distance, a route arc with participant pills (`S`, `B`, `G+3`, `L`) and a finish flag. This is the product's signature moment and the site's central proof.
- PRD: `docs/prd.md`.

**Absent — do not fabricate:** user testimonials, install counts, App Store rating, named customers, press, benchmarks, funding, team bios, screenshots of the app's main UI, a specific launch date.

## Product Principles

1. **The best session is no session.** Anything the site claims should reinforce that Omawe's value is delivered while the app is closed.
2. **Honest state over flattering state.** The product shows stale data as stale; the site shows beta as beta.
3. **Scope refusal is the feature.** Time-boxed, one destination, no chat — say these as commitments, not as gaps.
4. **Reads as iOS.** SF Pro, system materials, Apple motion sensibility. The site should feel continuous with the app.
5. **Only claim what ships.** iOS-only, TestFlight, no push notifications yet.

## Accessibility & Inclusion

No product-specific standard established. Baseline applies: WCAG AA contrast, full keyboard reach, `prefers-reduced-motion` honored (the page leans on motion, so this is load-bearing), and no meaning carried by color alone in the status system.
