"use client";
import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { OptimisticAction, Task } from "@/app/_dataTypes/types";
import EditTaskModal from "./Dashboard Modals/EditTaskModal";
import DeleteTaskModal from "./Dashboard Modals/DeleteTaskModal";
import DropdownMenu from "./DropdownMenu";

export default function TaskActionsMenu({
  task,
  performOptimisticTask,
}: {
  task: Task;
  performOptimisticTask: (action: OptimisticAction) => void;
}) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const menuItems = [
    {
      icon: <Edit2 size={14} />,
      label: "Edit",
      onClick: () => setEditModalOpen(true),
    },
    {
      icon: <Trash2 size={14} />,
      label: "Delete",
      onClick: () => setDeleteModalOpen(true),
      variant: "danger" as const,
    },
  ];

  return (
    <>
      <DropdownMenu items={menuItems} />

      <EditTaskModal
        isOpen={editModalOpen}
        task={task}
        openModal={() => setEditModalOpen(true)}
        onClose={() => setEditModalOpen(false)}
        performOptimisticTask={performOptimisticTask}
      />

      <DeleteTaskModal
        isOpen={deleteModalOpen}
        task={task}
        onClose={() => setDeleteModalOpen(false)}
      />
    </>
  );
}
