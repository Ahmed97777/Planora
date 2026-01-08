# Planora

A high-performance project management platform built with **Next.js 16** App Router, **React 19**, and **Supabase**. Planora leverages modern web patterns to deliver a seamless, low-latency and highly responsive Kanban experience.

## 🚀 Tech Stack & Key Features

- **Full-Stack Kanban Board:** Interactive task management with real-time feedback.
- **Optimistic UI:** Instant state updates for task creation and updates using React 19's `useOptimistic`.
- **Advanced Filtering:** Real-time search and category filtering for complex project views.
- **Secure Authentication:** Multi-strategy auth flow using Supabase Auth and Middleware-based route protection.
- **Database & Auth:** Supabase (PostgreSQL) with Row Level Security (RLS).
- **Performance:** Optimized with Skeletons, Selective Hydration, and efficient server-first data fetching.
- **Styling:** Tailwind CSS.

## 🏗️ Architecture & Technical Decisions

- **Server-Side Rendering (SSR) with React Server Components (RSC):** Utilized for the majority of data fetching to reduce client-side JavaScript bundles and improve TTI (Time to Interactive).
- **Server Actions:** All mutations (Create, Edit, Delete) are handled via Server Actions.
- **Streaming & Suspense:** Granular loading states via `loading.tsx` and custom `DashboardSkeleton.tsx` for a "perceived performance" boost.
- **Structured Data Flow:**

  - `_actions/`: Centralized server-side logic and database mutations.
  - `_lib/`: Shared business logic, data fetching services, and validation schemas.
  - `_dataTypes/`: Centralized TypeScript interfaces to ensure end-to-end type safety.

- **Modular UI:** Atomic component design (Modals, Inputs, Buttons) for high reusability and maintainability.

## 🛠️ Getting Started

1. **Clone & Install:** `npm install`
2. **Environment Variables:** Create a `.env.local` with your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. **Run Development:** `npm run dev`

> **Note:** This project utilizes Next.js **Private Folders** (prefixed with `_`) to colocate logic, components, and actions within the `app` directory without affecting routing, keeping the codebase highly modular.
