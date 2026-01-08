import { ProjectDetails } from "@/app/_dataTypes/types";
import { Calendar, Folder } from "lucide-react";

export default function ProjectHeader({
  projectDetails,
  totalProjects,
  totalTasks,
}: {
  projectDetails: ProjectDetails[] | undefined;
  totalProjects: number;
  totalTasks: number;
}) {
  if (projectDetails) {
    const project = projectDetails[0];

    return (
      <div className="flex items-center justify-between gap-6 px-4 py-3 bg-primary-900/50 border border-primary-800 rounded-sm">
        <div className="flex items-center gap-3 min-w-0">
          <Folder size={16} className="text-primary-400 shrink-0" />

          <h1
            className="font-semibold text-primary-50 min-w-0 truncate wrap-break-word max-w-[320px]"
            title={project.name}
          >
            {project.name}
          </h1>
        </div>

        <div className="flex items-center gap-3 min-w-0">
          <p
            className="text-sm text-primary-300 min-w-0 truncate wrap-break-word max-w-90"
            title={project.projectDescription}
          >
            {project.projectDescription}
          </p>

          <span className="text-primary-500 shrink-0">•</span>

          <div className="flex items-center gap-1 text-sm text-primary-400 shrink-0">
            <Calendar size={14} />
            <span>
              {new Date(project.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <span className="text-primary-500 shrink-0">•</span>

          <span className="text-sm font-medium text-primary-300 shrink-0">
            <span className="font-semibold text-cyan-500">{totalTasks}</span>{" "}
            tasks
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-between px-4 py-3
                    bg-primary-900/50 border border-primary-800 rounded-sm"
    >
      <div className="flex items-center gap-3">
        <Folder size={16} className="text-primary-400" />
        <h1 className="font-semibold text-primary-50">
          All Projects{" "}
          <span className="font-semibold text-cyan-500">{totalProjects}</span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-sm text-primary-300">
          All tasks across your projects
        </p>
        <span className="text-primary-500">•</span>
        <span className="text-sm font-medium text-primary-300">
          <span className="font-semibold text-cyan-500">{totalTasks}</span>{" "}
          tasks
        </span>
      </div>
    </div>
  );
}
