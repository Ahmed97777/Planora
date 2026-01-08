"use server";
import { createSupabaseServer } from "@/utils/supabase/server";

export async function createTask(formData: FormData) {
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();
  const user_id = data?.user?.id as string;

  const taskData = Object.fromEntries(formData);

  const title = String(taskData.title || "").trim();
  const taskDescription = String(taskData.taskDescription || "").trim();
  const priority = String(taskData.priority || "").trim();
  const dueDate = String(taskData.dueDate || "").trim();
  const project_id = taskData.project_id;
  const status = taskData.status;

  if (
    !title ||
    !taskDescription ||
    !priority ||
    !dueDate ||
    !project_id ||
    !status
  ) {
    return { error: "All Task data is required." };
  }

  if (!taskDescription) {
    return { error: "Task description is required." };
  }

  if (title.length < 3) {
    return { error: "Task title must be at least 3 characters." };
  }

  if (taskDescription.length > 500) {
    return { error: "Description must be less than 500 characters." };
  }

  if (!priority || !["low", "medium", "high"].includes(priority)) {
    return { error: "Please select a valid priority." };
  }

  if (!status || !["todo", "in_progress", "done"].includes(status as string)) {
    return { error: "Invalid status." };
  }

  const validTaskData = {
    title,
    taskDescription,
    priority,
    dueDate,
    project_id: Number(project_id),
    status,
    user_id,
  };

  const { data: newTask, error } = await supabase
    .from("tasks")
    .insert([validTaskData])
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data: newTask };
}

export async function updateTask(formData: FormData) {
  const supabase = await createSupabaseServer();
  const taskData = Object.fromEntries(formData);

  const id = Number(taskData.id);
  const title = String(taskData.title || "").trim();
  const taskDescription = String(taskData.taskDescription || "").trim();
  const priority = String(taskData.priority || "").trim();
  const dueDate = String(taskData.dueDate || "").trim();
  const project_id = taskData.project_id;
  const status = taskData.status;

  if (!id) {
    return { error: "Task ID is required." };
  }

  if (
    !title ||
    !taskDescription ||
    !priority ||
    !dueDate ||
    !project_id ||
    !status
  ) {
    return { error: "All Task data is required." };
  }

  if (title.length < 3) {
    return { error: "Task title must be at least 3 characters." };
  }

  if (taskDescription.length > 500) {
    return { error: "Description must be less than 500 characters." };
  }

  if (!priority || !["low", "medium", "high"].includes(priority)) {
    return { error: "Please select a valid priority." };
  }

  if (!status || !["todo", "in_progress", "done"].includes(status as string)) {
    return { error: "Invalid status." };
  }

  const validTaskData = {
    title,
    taskDescription,
    priority,
    dueDate,
    project_id: Number(project_id),
    status,
  };

  const { data: updatedTask, error } = await supabase
    .from("tasks")
    .update(validTaskData)
    .eq("id", id)
    .select();

  if (error) {
    return { error: error.message };
  }

  if (!updatedTask || updatedTask.length === 0) {
    return {
      error: "Task not found or you don't have permission to update it.",
    };
  }

  return { data: updatedTask };
}

export async function deleteTask(taskId: number) {
  const supabase = await createSupabaseServer();

  if (!taskId) {
    return { error: "Task ID is required." };
  }

  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
