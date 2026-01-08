import { Task } from "@/app/_dataTypes/types";
import { getTasks } from "@/app/_lib/fetchData/fetchProjectsTasksData";
import Dashboard from "@/app/_components/dashboardComponents/Dashboard";

type SearchParamsShape = {
  project?: string;
  search?: string;
  priority?: string;
};

function filterTasksServerSide(
  tasks: Task[],
  params: SearchParamsShape
): { todo: Task[]; inProgress: Task[]; done: Task[] } {
  const projectFilter = params.project ? params.project : null;
  const search = (params.search ?? "").trim().toLowerCase();
  const priorityFilter =
    params.priority && params.priority !== "all" ? params.priority : null;

  const matches = (task: Task) => {
    if (projectFilter && Number(task.project_id) !== Number(projectFilter))
      return false;

    if (priorityFilter && task.priority !== priorityFilter) return false;

    if (search) {
      const hay = `${task.title ?? ""} ${
        task.taskDescription ?? ""
      }`.toLowerCase();
      if (!hay.includes(search)) return false;
    }
    return true;
  };

  const todo: Task[] = [];
  const inProgress: Task[] = [];
  const done: Task[] = [];

  for (const t of tasks) {
    if (!matches(t)) continue;
    if (t.status === "todo") todo.push(t);
    else if (t.status === "in_progress") inProgress.push(t);
    else done.push(t);
  }

  return { todo, inProgress, done };
}

export default async function DashboardContent({
  searchParameters,
}: {
  searchParameters: { [key: string]: string | undefined };
}) {
  const tasks: Task[] = await getTasks();

  const params: SearchParamsShape = {
    project: searchParameters.project ?? "",
    search: searchParameters.search ?? "",
    priority: (searchParameters.priority ?? "") || "all",
  };

  const { todo, inProgress, done } = filterTasksServerSide(tasks, params);

  return (
    <Dashboard
      todo={todo}
      inProgress={inProgress}
      done={done}
      selectedProject={params.project ?? ""}
      searchParams={params}
    />
  );
}
