"use client";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import SubmitFormButton from "./SubmitFormButton";
import { Plus } from "lucide-react";
import { createTask } from "@/app/_actions/taskActions";
import Modal from "./Modal";
import { ErrorMessage } from "./ErrorMessage";
import { FormInput, FormSelect, FormTextarea } from "./FormInputs";
import {
  OptimisticAction,
  PRIORITY_OPTIONS,
  Task,
} from "@/app/_dataTypes/types";

export default function NewTaskModal({
  projectId,
  status,
  performOptimisticTask,
}: {
  projectId: string;
  status: "todo" | "in_progress" | "done";
  performOptimisticTask: (action: OptimisticAction) => void;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onClose = () => {
    setError(null);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-1 hover:bg-primary-800 rounded transition-colors cursor-pointer"
      >
        <Plus size={18} className="text-primary-400" />
      </button>

      <Modal isOpen={open} onClose={onClose}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            setError(null);

            const optimisticTask: Task = {
              id: `temp-${Date.now()}`,
              title: formData.get("title") as string,
              taskDescription: formData.get("taskDescription") as string,
              priority: formData.get("priority") as "low" | "medium" | "high",
              status,
              dueDate: formData.get("dueDate") as string,
              project_id: projectId,
              created_at: new Date().toISOString(),
            };

            startTransition(() => {
              performOptimisticTask({ type: "add", task: optimisticTask });
            });

            setOpen(false);

            const result = await createTask(formData);

            if (result?.error) {
              startTransition(() => {
                performOptimisticTask({
                  type: "remove",
                  tempId: optimisticTask.id,
                });
              });
              setError(result.error);
              setOpen(true);
              return;
            }

            router.refresh();
          }}
        >
          <h3 className="text-xl font-semibold mb-4">Create New Task</h3>
          {error && <ErrorMessage message={error} />}

          <input type="hidden" name="project_id" value={projectId} />
          <input type="hidden" name="status" value={status} />

          <FormInput name="title" placeholder="Task title" required />

          <FormTextarea
            name="taskDescription"
            placeholder="Task description"
            rows={3}
            required
          />

          <FormSelect name="priority" options={PRIORITY_OPTIONS} required />

          <FormInput type="date" name="dueDate" required />

          <SubmitFormButton actionType="create" onClose={onClose} />
        </form>
      </Modal>
    </>
  );
}
