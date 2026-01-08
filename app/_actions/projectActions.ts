"use server";

import { createSupabaseServer } from "@/utils/supabase/server";

export async function createProject(formData: FormData) {
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();
  const user_id = data?.user?.id as string;

  const projectData = Object.fromEntries(formData);
  const name = String(projectData.name || "").trim();
  const projectDescription = String(
    projectData.projectDescription || ""
  ).trim();

  if (!name) {
    return { error: "Project name is required." };
  }

  if (!projectDescription) {
    return { error: "Project description is required." };
  }

  if (name.length < 3) {
    return { error: "Project name must be at least 3 characters." };
  }

  if (projectDescription.length > 300) {
    return { error: "Description must be less than 300 characters." };
  }

  const validProjectData = {
    name,
    projectDescription,
    user_id,
  };

  const { data: newProject, error } = await supabase
    .from("projects")
    .insert([validProjectData])
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data: newProject };
}

export async function updateProject(formData: FormData) {
  const supabase = await createSupabaseServer();

  const projectData = Object.fromEntries(formData);
  const id = Number(projectData.id);
  const name = String(projectData.name || "").trim();
  const projectDescription = String(
    projectData.projectDescription || ""
  ).trim();

  if (!id) {
    return { error: "Project ID is required." };
  }
  if (!name) {
    return { error: "Project name is required." };
  }
  if (!projectDescription) {
    return { error: "Project description is required." };
  }
  if (name.length < 3) {
    return { error: "Project name must be at least 3 characters." };
  }
  if (projectDescription.length > 300) {
    return { error: "Description must be less than 300 characters." };
  }

  const validProjectData = {
    name,
    projectDescription,
  };

  const { data: updatedProject, error } = await supabase
    .from("projects")
    .update(validProjectData)
    .eq("id", id)
    .select();

  if (error) {
    return { error: error.message };
  }

  return { data: updatedProject };
}

export async function deleteProject(projectId: number) {
  const supabase = await createSupabaseServer();

  if (!projectId) {
    return { error: "Project ID is required." };
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
