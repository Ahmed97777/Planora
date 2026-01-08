import { createSupabaseServer } from "@/utils/supabase/server";

export async function getProjects() {
  const supabase = await createSupabaseServer();

  const { data: projects, error } = await supabase
    .from("projects_with_task_count")
    .select("*");

  if (error) throw error;
  return projects;
}

export async function getProjectById(projectId: string) {
  const supabase = await createSupabaseServer();

  const { data: project, error } = await supabase
    .from("projects")
    .select("created_at,name,projectDescription")
    .eq("id", projectId);

  if (error) throw error;
  return project;
}

export async function getTasks(projectId?: string) {
  const supabase = await createSupabaseServer();

  let query = supabase.from("tasks").select("*");

  if (projectId) {
    query = query.eq("project_id", projectId);
  }

  const { data: tasks, error } = await query;

  if (error) throw error;
  return tasks;
}
