import { Project, Task, User } from "@/app/_dataTypes/types";
import {
  getProjectById,
  getProjects,
} from "@/app/_lib/fetchData/fetchProjectsTasksData";
import { createSupabaseServer } from "@/utils/supabase/server";

export default async function Dashboard({
  todo,
  inProgress,
  done,
  selectedProject,
  searchParams,
}: {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
  selectedProject: string | null;
  searchParams: { project?: string | null; search?: string; priority?: string };
}) {
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();
  const user = data.user as User;
  const projects: Project[] = await getProjects();
  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p.name]));

  let projectDetails;
  if (selectedProject) {
    projectDetails = await getProjectById(selectedProject);
  }

  return (
    <div className="flex flex-1 overflow-hidden bg-primary-950 text-primary-100 h-full"></div>
  );
}
