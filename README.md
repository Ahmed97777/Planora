# Planora

A high-performance project management platform built with **Next.js 16** App Router, **React 19**, and **Supabase**. Planora leverages modern web patterns to deliver a seamless, low-latency and highly responsive Kanban experience.

## 🚀 Tech Stack & Key Features

- **Full-Stack Kanban Board:** Interactive task management with real-time feedback.
- **Optimistic UI:** Instant state updates for task creation and updates using React 19's `useOptimistic`.
- **Advanced Filtering:** Real-time search and category filtering for complex project views.
- **Secure Authentication:** Multi-strategy auth flow using Supabase Auth with **Proxy-based route protection**.
- **Database & Auth:** Supabase (PostgreSQL) with Row Level Security (RLS), including a **database View that joins projects with aggregated task counts** for efficient dashboard data retrieval.
- **Performance:** Optimized using **React Suspense**, **lazy loading**, Skeleton loaders, Selective Hydration, and efficient server-first data fetching for fast Time To Interactive (TTI).
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

## 📸 Screenshots

---

### 🔐 Welcome and Authentication Page

Customized Design for A Welcome Page. Secure authentication flow powered by Supabase Auth with protected routes and Proxy-based access control.

![Welcome Page](./screenshots/Welcome%20Page.PNG)

![Sign in](./screenshots/Sign%20in.PNG)

![Sign up](./screenshots/Sign%20up.PNG)

---

### 🧩 Kanban Board Overview

The main dashboard displaying projects and tasks organized in a Kanban board.
Tasks are grouped by status (**To Do / In Progress / Done**) with visible priorities, actions (Edit, Delete) and due dates (highlighted in red if overdue in **To Do** or **In Progress**).

![Kanban Board Overview 1](./screenshots/Kanban-Board.PNG)

![Kanban Board Overview 2](./screenshots/Kanban-Board%202.PNG)

![Kanban Board Overview all](./screenshots/All%20Projects%20Kanban-Board.PNG)

---

### 📝 Project/Task Modal (Create / Edit)

Modal used for creating and editing projects and tasks.  
Includes project name, project description, task title, task description, priority selection, due date, and status updates with optimistic UI.

![Project Modal Create](./screenshots/Create%20Project%20Modal.PNG)

![Project Modal Edit](./screenshots/Edit%20Project%20Modal.PNG)

![Project Modal Delete](./screenshots/Delete%20Project%20Modal.PNG)

![Task Modal Create](./screenshots/Create%20Task%20Modal.PNG)

![Task Modal Edit](./screenshots/Edit%20Task%20Modal.PNG)

![Task Modal Delete](./screenshots/Delete%20Task%20Modal.PNG)

---

### 🔍 Advanced Filtering (Priority status, and Keyword search) and Sorting for tasks (Sort by due date (Default), Sorted Earliest first, and Sorted Latest first)

Real-time task filtering by priority status, and keyword search.

![Advanced Priority Filtering](./screenshots/Priority%20Filter%20Feature.PNG)

![Advanced Searching](./screenshots/Search%20Feature.PNG)

![Advanced Priority Filtering with Searching](./screenshots/Search%20and%20Priority%20Feature%201.PNG)

![Advanced Sorting, Sorted Earliest first](./screenshots/sorting.PNG)

---

### ⚡ Skeleton Loading State

Skeleton loaders used to improve User Experience during data fetching at first time to load page.

![Skeleton Loading](./screenshots/Skeleton-Loading.PNG)

---

## 📂 Project Structure

```
planora
├─ app
│  ├─ (dashboard)
│  ├─ auth
│  ├─ error.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ loading.tsx
│  ├─ not-found.tsx
│  ├─ page.tsx
│  ├─ _actions
│  ├─ _components
│  ├─ _dataTypes
│  └─ _lib
├─ proxy.ts
├─ public
├─ README.md
└─ utils
   └─ supabase
      ├─ client.ts
      └─ server.ts

```

> **Note:** This project utilizes Next.js **Private Folders** (prefixed with `_`) to colocate logic, components, and actions within the `app` directory without affecting routing, keeping the codebase highly modular.
