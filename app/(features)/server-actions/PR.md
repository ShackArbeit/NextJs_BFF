# Overview
Showcase for Next.js Server Actions with `useActionState` and `useTransition`.

- In-memory fake data: `app/lib/fakedate.ts`.
- Server actions: `app/(features)/server-actions/action.ts`.
- Demos: `app/(features)/server-actions/(demos)`  
  - `action_in_server_coponent.tsx`: Server Component + server action with `useActionState` pending UI.  
  - `action_in_client_coponent.tsx`: Client Component receives a server action prop and wraps submit in `startTransition` for pending UI.
- Models used for the fake data: `app/models/CityPost.ts`, `app/models/MarryAgePost.ts`.
- Shared UI components:  
  - Server demo uses `BoardShell.tsx` (server), `BoardList.server.tsx` (server; wraps `DeleteButton.client.tsx`).  
  - Client demo uses `BoardShell.client.tsx`, `BoardList.client.tsx`, plus shared `BoardForm.client.tsx` via `ClientMarryAgeBoard.tsx` (client container).
- Boards in scope: `city`, `marryAge` (other demo boards were removed for focus).

# How to navigate
- Entry page: `app/(features)/server-actions/page.tsx`. Switch demos via `tab` query param, e.g. `/server-actions?tab=action_in_client_coponent`.
- Each demo composes:
  1. `BoardShell` for layout.
  2. `BoardForm.client` to submit to the server action.
  3. `BoardList.server` to render the latest posts (soft delete supported).

# Pending UX and delay
- Server actions simulate latency with a `setTimeout` in `createPostForBoard` inside `action.ts`.
- Server-component demo: server-rendered shell/list; `useActionState` in the client form drives pending/error UI while the action runs.
- Client-component demo: marked `use client`, uses `useEffect` + `startTransition` to fetch/refresh lists and keep the UI responsive while the server action runs.

# Soft delete flow (action.ts)
- Uses flags (`isDeleted`, `deletedAt`) instead of removing data.
- `softDeletePost` marks records, `restorePost` reverts, `listDeletedPosts` exposes trash.
- `revalidatePath` keeps the UI fresh after mutations.
