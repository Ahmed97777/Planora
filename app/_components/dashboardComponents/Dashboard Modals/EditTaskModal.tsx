"use client";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { updateTask } from "@/app/_actions/taskActions";
import {
  OptimisticAction,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  Task,
} from "@/app/_dataTypes/types";
import Modal from "./Modal";
import { ErrorMessage } from "./ErrorMessage";
import { FormInput, FormSelect, FormTextarea } from "./FormInputs";
import SubmitFormButton from "./SubmitFormButton";

export default function EditTaskModal({
  isOpen,
  task,
  onClose,
  openModal,
  performOptimisticTask,
}: {
  isOpen: boolean;
  task: Task;
  onClose: () => void;
  openModal: () => void;
  performOptimisticTask: (action: OptimisticAction) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleClose = () => {
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          setError(null);

          const optimisticTask: Task = {
            ...task,
            title: formData.get("title") as string,
            taskDescription: formData.get("taskDescription") as string,
            status: formData.get("status") as Task["status"],
            priority: formData.get("priority") as Task["priority"],
            dueDate: formData.get("dueDate") as string,
          };

          // 🔥 Optimistic update
          startTransition(() => {
            performOptimisticTask({ type: "edit", task: optimisticTask });
          });

          onClose();

          const result = await updateTask(formData);

          if (result?.error) {
            startTransition(() => {
              performOptimisticTask({
                type: "remove",
                tempId: optimisticTask.id,
              });
            });
            setError(result.error);
            openModal();
            return;
          }

          router.refresh();
        }}
      >
        <h3 className="text-xl font-semibold mb-4">Edit Task</h3>

        {error && <ErrorMessage message={error} />}

        <input type="hidden" name="id" value={task.id} />
        <input type="hidden" name="project_id" value={task.project_id} />

        <FormInput
          name="title"
          placeholder="Task title"
          defaultValue={task.title}
          required
        />
        <FormTextarea
          name="taskDescription"
          placeholder="Task description"
          defaultValue={task.taskDescription}
          rows={3}
          required
        />
        <FormSelect
          name="status"
          options={STATUS_OPTIONS}
          defaultValue={task.status}
          required
        />
        <FormSelect
          name="priority"
          options={PRIORITY_OPTIONS}
          defaultValue={task.priority}
          required
        />
        <FormInput
          type="date"
          name="dueDate"
          defaultValue={task.dueDate}
          required
        />

        <SubmitFormButton actionType="edit" onClose={onClose} />
      </form>
    </Modal>
  );
}
