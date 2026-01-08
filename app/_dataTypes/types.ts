export interface Project {
  id: string;
  created_at: string;
  userId: string;
  name: string;
  color: string;
  projectDescription: string;
  tasks_count: number;
}

export interface ProjectDetails {
  created_at: string;
  name: string;
  projectDescription: string;
}

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  created_at: string;
  project_id: string;
  title: string;
  taskDescription: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate: string;
}

export interface StatusColumn {
  id: TaskStatus;
  label: string;
  colorClass: string;
}

export interface PriorityStyle {
  bg: string;
  text: string;
  dot: string;
}

export type PriorityConfig = Record<TaskPriority, PriorityStyle>;

export const statusColumns: StatusColumn[] = [
  { id: "todo", label: "To Do", colorClass: "bg-yellow-400" },
  { id: "in_progress", label: "In Progress", colorClass: "bg-blue-500" },
  { id: "done", label: "Done", colorClass: "bg-green-300" },
];

export const priorityConfig: PriorityConfig = {
  low: {
    bg: "bg-green-600",
    text: "text-white font-bold",
    dot: "bg-primary-300",
  },
  medium: {
    bg: "bg-yellow-600",
    text: "text-white font-bold",
    dot: "bg-amber-500",
  },
  high: {
    bg: "bg-red-600",
    text: "text-white font-bold",
    dot: "bg-red-600",
  },
};

interface Identity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: { [key: string]: unknown };
  provider: "email" | string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
}

interface AppMetadata {
  provider: "email" | string;
  providers: string[];
}

interface UserMetadata {
  email: string;
  email_verified: boolean;
  full_name: string;
  phone_verified: boolean;
  sub: string;
}

export interface User {
  id: string;
  aud: "authenticated" | string;
  role: "authenticated" | string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: Identity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

export const STATUS_OPTIONS = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export const PRIORITY_OPTIONS = [
  { value: "", label: "Select priority" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export type OptimisticAction =
  | { type: "add"; task: Task }
  | { type: "remove"; tempId: string }
  | { type: "edit"; task: Task };
