"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProject } from "@/app/_actions/projectActions";
import { Project } from "@/app/_dataTypes/types";
import { AlertTriangle } from "lucide-react";
import SubmitFormButton from "./SubmitFormButton";
import Modal from "./Modal";
import { ErrorMessage } from "./ErrorMessage";

export default function DeleteProjectModal({
  isOpen,
  project,
  onClose,
}: {
  isOpen: boolean;
  project: Project;
  onClose: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete() {
    setError(null);
    try {
      const result = await deleteProject(Number(project.id));

      if (result?.error) {
        setError(result.error);
        return;
      }

      if (!result?.success) {
        setError("Failed to delete project. Please try again.");
        return;
      }

      onClose();
      router.replace("/dashboard");
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  }

  const handleClose = () => {
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex items-start gap-4 mb-4">
        <div className="shrink-0 w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center">
          <AlertTriangle className="text-red-400" size={20} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Delete Project</h3>
          <p className="text-primary-300 text-sm">
            Are you sure you want to delete{" "}
            <span className="font-medium text-primary-100">{project.name}</span>
            ? This will also delete all {project.tasks_count} task(s) in this
            project. This action cannot be undone.
          </p>
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
      <form action={handleDelete}>
        <SubmitFormButton actionType="delete" onClose={onClose} />
      </form>
    </Modal>
  );
}
