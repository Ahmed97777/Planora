"use client";
import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Project } from "@/app/_dataTypes/types";
import DropdownMenu from "./DropdownMenu";
import EditProjectModal from "./Dashboard Modals/EditProjectModal";
import DeleteProjectModal from "./Dashboard Modals/DeleteProjectModal";

export default function ProjectActionsMenu({ project }: { project: Project }) {
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
      <EditProjectModal
        isOpen={editModalOpen}
        project={project}
        onClose={() => setEditModalOpen(false)}
      />
      <DeleteProjectModal
        isOpen={deleteModalOpen}
        project={project}
        onClose={() => setDeleteModalOpen(false)}
      />
    </>
  );
}
