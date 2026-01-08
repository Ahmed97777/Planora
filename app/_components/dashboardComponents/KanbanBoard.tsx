"use client";
import { useOptimistic, useState } from "react";
import { Calendar, Folder, ArrowUpDown } from "lucide-react";
import {
  OptimisticAction,
  priorityConfig,
  statusColumns,
  Task,
} from "@/app/_dataTypes/types";
import {
  capitalizeFirstLetter,
  getStatusColumnClass,
  getTaskColorClass,
} from "@/app/_lib/utils/functions";
import ProjectHeader from "./ProjectHeader";
import NewTaskModal from "./Dashboard Modals/NewTaskModal";
import TaskActionsMenu from "./TaskActionsMenu";

export default function KanbanBoard({
  todo,
  inProgress,
  done,
  totalProjects,
  selectedProject,
  projectMap,
  projectDetails,
}: {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
  totalProjects: number;
  selectedProject: string | null;
  projectMap: {
    [k: string]: string;
  };
  projectDetails?:
    | {
        created_at: string;
        name: string;
        projectDescription: string;
      }[]
    | undefined;
}) {
  const [sortStates, setSortStates] = useState<{
    todo: "asc" | "desc" | null;
    inProgress: "asc" | "desc" | null;
    done: "asc" | "desc" | null;
  }>({
    todo: null,
    inProgress: null,
    done: null,
  });

  const [optimisticTasks, performOptimisticTask] = useOptimistic(
    { todo, inProgress, done },
    (state, action: OptimisticAction) => {
      switch (action.type) {
        case "add": {
          const newTask = action.task;

          return {
            todo:
              newTask.status === "todo" ? [...state.todo, newTask] : state.todo,
            inProgress:
              newTask.status === "in_progress"
                ? [...state.inProgress, newTask]
                : state.inProgress,
            done:
              newTask.status === "done" ? [...state.done, newTask] : state.done,
          };
        }

        case "edit": {
          const updated = action.task;

          const findSourceColumn = () => {
            if (state.todo.some((t) => t.id === updated.id)) return "todo";
            if (state.inProgress.some((t) => t.id === updated.id))
              return "inProgress";
            return "done";
          };

          const sourceColumn = findSourceColumn();

          const removeFrom = (tasks: Task[]) =>
            tasks.filter((t) => t.id !== updated.id);

          const addToEnd = (tasks: Task[]) => [...tasks, updated];

          const nextState = {
            todo: state.todo,
            inProgress: state.inProgress,
            done: state.done,
          };

          if (
            (sourceColumn === "todo" && updated.status === "todo") ||
            (sourceColumn === "inProgress" &&
              updated.status === "in_progress") ||
            (sourceColumn === "done" && updated.status === "done")
          ) {
            const cleaned = removeFrom(state[sourceColumn]);
            nextState[sourceColumn] = addToEnd(cleaned);
            return nextState;
          }

          nextState[sourceColumn] = removeFrom(state[sourceColumn]);

          if (updated.status === "todo") {
            nextState.todo = addToEnd(state.todo);
          } else if (updated.status === "in_progress") {
            nextState.inProgress = addToEnd(state.inProgress);
          } else {
            nextState.done = addToEnd(state.done);
          }

          return nextState;
        }

        case "remove": {
          return {
            todo: state.todo.filter((t) => t.id !== action.tempId),
            inProgress: state.inProgress.filter((t) => t.id !== action.tempId),
            done: state.done.filter((t) => t.id !== action.tempId),
          };
        }

        default:
          return state;
      }
    }
  );

  const sortTasksByDate = (tasks: Task[], order: "asc" | "desc" | null) => {
    if (!order) return tasks;

    return [...tasks].sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const toggleSort = (columnId: "todo" | "inProgress" | "done") => {
    setSortStates((prev) => ({
      ...prev,
      [columnId]:
        prev[columnId] === null
          ? "asc"
          : prev[columnId] === "asc"
          ? "desc"
          : null,
    }));
  };

  return (
    <div className="flex flex-col flex-1 gap-6 h-full">
      <div className="min-w-[calc(3*17rem+3*1.5rem)]">
        <ProjectHeader
          projectDetails={projectDetails}
          totalProjects={totalProjects}
          totalTasks={
            optimisticTasks.todo.length +
            optimisticTasks.inProgress.length +
            optimisticTasks.done.length
          }
        />
      </div>

      <div className="flex flex-1 h-full gap-6">
        {statusColumns.map((column) => {
          const columnKey =
            column.id === "in_progress" ? "inProgress" : column.id;

          const unsortedTasks =
            column.id === "todo"
              ? optimisticTasks.todo
              : column.id === "in_progress"
              ? optimisticTasks.inProgress
              : optimisticTasks.done;

          const columnTasks = sortTasksByDate(
            unsortedTasks,
            sortStates[columnKey as "todo" | "inProgress" | "done"]
          );

          const currentSort =
            sortStates[columnKey as "todo" | "inProgress" | "done"];

          return (
            <div
              key={column.id}
              className="flex-1 flex flex-col min-w-72 h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${column.colorClass}`}
                  />
                  <h2 className="font-semibold text-primary-50">
                    {column.label}
                  </h2>
                  <span
                    className={`text-sm font-bold text-gray-900 ${getStatusColumnClass(
                      column.id
                    )} py-1 px-3 rounded-md shadow-lg transform hover:scale-105 transition-transform`}
                  >
                    {columnTasks.length}
                  </span>
                  <button
                    onClick={() =>
                      toggleSort(columnKey as "todo" | "inProgress" | "done")
                    }
                    className={`ml-1 p-1.5 rounded transition-all ${
                      currentSort
                        ? "bg-primary-700 text-primary-200"
                        : "hover:bg-primary-800 text-primary-400"
                    }`}
                    title={
                      currentSort === "asc"
                        ? "Sorted: Earliest first (click for latest first)"
                        : currentSort === "desc"
                        ? "Sorted: Latest first (click to clear)"
                        : "Sort by due date"
                    }
                  >
                    {currentSort === "asc" ? (
                      <span className="flex items-center gap-0.5 text-xs">
                        <Calendar size={12} />↑
                      </span>
                    ) : currentSort === "desc" ? (
                      <span className="flex items-center gap-0.5 text-xs">
                        <Calendar size={12} />↓
                      </span>
                    ) : (
                      <ArrowUpDown size={14} />
                    )}
                  </button>
                </div>
                {selectedProject && (
                  <NewTaskModal
                    projectId={selectedProject}
                    status={column.id}
                    performOptimisticTask={performOptimisticTask}
                  />
                )}
              </div>

              <div className="flex-1 overflow-y-auto px-2 space-y-3 scrollbar-gutter-stable min-h-0 max-h-[calc(100vh-250px)]">
                {columnTasks.length < 1 ? (
                  <div className="flex items-center justify-center">
                    <div className="text-base font-medium px-3 py-1 rounded-full text-center bg-primary-800/60 text-primary-400 border border-primary-700">
                      No tasks added
                    </div>
                  </div>
                ) : (
                  columnTasks.map((task) => {
                    const priorityStyle = priorityConfig[task.priority];
                    const isOptimistic = String(task.id).startsWith("temp-");
                    let isOverdue: boolean = false;
                    if (column.id !== "done") {
                      isOverdue = new Date(task.dueDate).getTime() < Date.now();
                    }

                    return (
                      <div
                        key={task.id}
                        className={`bg-primary-900 border border-primary-800 min-w-60 rounded-sm p-4 hover:border-primary-700 transition-colors w-full flex flex-col ${
                          isOptimistic ? "opacity-60" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3
                            className="font-medium text-primary-50 flex-1 min-w-0 truncate wrap-break-word"
                            title={task.title}
                          >
                            {task.title}
                          </h3>
                          {!isOptimistic && (
                            <TaskActionsMenu
                              task={task}
                              performOptimisticTask={performOptimisticTask}
                            />
                          )}
                        </div>

                        <p
                          className="text-sm text-primary-300 mb-3 line-clamp-2 min-w-0 truncate wrap-break-word"
                          title={task.taskDescription}
                        >
                          {task.taskDescription}
                        </p>

                        <div className="flex items-center justify-between min-w-0">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${getTaskColorClass(
                                task.priority
                              )}`}
                            />

                            <span
                              className={`text-xs px-2 py-1 justify-center items-center rounded-md ${priorityStyle.bg} ${priorityStyle.text}`}
                            >
                              {capitalizeFirstLetter(task.priority)}
                            </span>
                          </div>

                          <div
                            className={`flex justify-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                              isOverdue
                                ? "bg-red-500/15 text-red-400 border border-red-500/30"
                                : "bg-primary-800/60 text-primary-400 border border-primary-700"
                            }`}
                          >
                            <Calendar size={12} className="shrink-0" />
                            <span className="truncate">
                              {new Date(task.dueDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>

                        {!selectedProject && (
                          <span
                            className="flex items-center justify-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-sm 
                   bg-primary-800/40 border border-primary-700/50 
                   text-primary-300 tracking-wide shadow-sm mt-5 max-w-full truncate"
                          >
                            <Folder size={11} className="text-primary-400" />
                            {projectMap[task.project_id]}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
