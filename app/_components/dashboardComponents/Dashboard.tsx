import Sidebar from "../Sidebar";
import KanbanBoard from "./KanbanBoard";
import DashboardTopBar from "./DashboardTopBar";
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
    <div className="flex flex-1 overflow-hidden bg-primary-950 text-primary-100 h-full">
      <Sidebar
        selectedProject={selectedProject}
        projects={projects}
        user={user}
      />

      <div className="flex-1 flex flex-col overflow-hidden h-full">
        <DashboardTopBar
          initialSearch={searchParams.search ?? ""}
          initialPriority={(searchParams.priority as string) ?? "all"}
        />

        <main className="flex-1 overflow-auto px-8 py-8">
          <KanbanBoard
            todo={todo}
            inProgress={inProgress}
            done={done}
            totalProjects={projects.length}
            selectedProject={selectedProject}
            projectMap={projectMap}
            projectDetails={projectDetails}
          />
        </main>
      </div>
    </div>
  );
}
