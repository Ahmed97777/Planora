import { useMemo } from "react";
import { Task, TaskPriority } from "@/app/_dataTypes/types";

export default function useFilteredTasks({
  tasks,
  searchQuery,
  selectedProject,
  filterPriority,
}: {
  tasks: Task[];
  searchQuery: string;
  selectedProject: string | null;
  filterPriority: TaskPriority | "all";
}) {
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.taskDescription.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProject =
        !selectedProject || task.project_id === selectedProject;

      const matchesPriority =
        filterPriority === "all" || task.priority === filterPriority;

      return matchesSearch && matchesProject && matchesPriority;
    });
  }, [searchQuery, selectedProject, filterPriority, tasks]);

  return useMemo(() => {
    const groups: { todo: Task[]; inProgress: Task[]; done: Task[] } = {
      todo: [],
      inProgress: [],
      done: [],
    };

    for (const task of filteredTasks) {
      if (task.status === "todo") groups.todo.push(task);
      else if (task.status === "in_progress") groups.inProgress.push(task);
      else if (task.status === "done") groups.done.push(task);
    }

    return groups;
  }, [filteredTasks]);
}
