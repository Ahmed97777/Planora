"use client";

import { useTransition } from "react";
import { Project } from "../_dataTypes/types";
import { getInitials } from "../_lib/utils/functions";
import { Folder } from "lucide-react";
import Header from "./Header";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import SpinnerTiny from "./SpinnerTiny";
import NewProjectModal from "./dashboard/Dashboard Modals/NewProjectModal";
import ProjectActionsMenu from "./dashboard/ProjectActionsMenu";
import SignOut from "./SignOut";

interface SidebarProps {
  selectedProject: string | null;
  projects: Project[];
  user: { user_metadata: { full_name: string }; email: string };
}

export default function Sidebar({
  selectedProject,
  projects,
  user,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateProjectParam = (projectId: string | null) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (projectId) params.set("project", projectId);
      else params.delete("project");

      const queryParams = params.toString();
      router.replace(queryParams ? `${pathname}?${queryParams}` : pathname);
    });
  };

  return (
    <aside className="w-72 flex flex-col border-r border-primary-800 h-screen bg-primary-900">
      <Header />

      <div className="p-4 shrink-0">
        <NewProjectModal />

        <div className="flex mt-3 px-4 text-xs uppercase tracking-wider text-primary-300 font-semibold">
          <p className="flex-1">Projects</p>
          {isPending && <SpinnerTiny />}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="space-y-1 pb-4">
          <button
            onClick={() => updateProjectParam(null)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-colors cursor-pointer ${
              !selectedProject
                ? "bg-primary-800 text-primary-50"
                : "text-primary-200 hover:bg-primary-800/50"
            }`}
          >
            <Folder size={18} />
            <span className="flex-1 text-left">All Projects</span>
            <span className="text-xs text-primary-300">
              <span>#projects: </span>
              {projects.length}
            </span>
          </button>

          {projects?.map((project) => (
            <div
              key={project.id}
              onClick={() => updateProjectParam(project.id)}
              className={`group flex items-center gap-2 px-4 py-3 rounded-sm transition-colors cursor-pointer ${
                Number(selectedProject) === Number(project.id)
                  ? "bg-primary-800 text-primary-50"
                  : "text-primary-200 hover:bg-primary-800/50"
              }`}
            >
              <button className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer">
                <div className="w-3 h-3 rounded-full bg-cyan-700" />
                <span
                  className="flex-1 text-left min-w-0 truncate"
                  title={project.name}
                >
                  {project.name}
                </span>
                <span className="text-xs text-primary-300 min-w-0 truncate">
                  <span>#tasks: </span>
                  {project.tasks_count}
                </span>
              </button>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ProjectActionsMenu project={project} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="shrink-0 p-4 border-t border-primary-800">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center text-primary-900 font-semibold">
            {getInitials(user.user_metadata.full_name)}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">
              {user.user_metadata.full_name}
            </div>
            <div className="text-xs text-primary-300">{user.email}</div>
          </div>
          <SignOut />
        </div>
      </div>
    </aside>
  );
}
