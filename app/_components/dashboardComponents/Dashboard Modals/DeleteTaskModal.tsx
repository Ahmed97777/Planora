"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTask } from "@/app/_actions/taskActions";
import { Task } from "@/app/_dataTypes/types";
import { AlertTriangle } from "lucide-react";
import SubmitFormButton from "./SubmitFormButton";
import Modal from "./Modal";
import { ErrorMessage } from "./ErrorMessage";

export default function DeleteTaskModal({
  isOpen,
  task,
  onClose,
}: {
  isOpen: boolean;
  task: Task;
  onClose: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete() {
    setError(null);

    try {
      const result = await deleteTask(Number(task.id));

      if (result?.error) {
        setError(result.error);
        return;
      }

      if (!result?.success) {
        setError("Failed to delete task. Please try again.");
        return;
      }

      onClose();
      router.refresh();
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
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center">
          <AlertTriangle className="text-red-400" size={20} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Delete Task</h3>
          <p className="text-primary-300 text-sm">
            Are you sure you want to delete{" "}
            <span className="font-medium text-primary-100">{task.title}</span>?
            This action cannot be undone.
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
