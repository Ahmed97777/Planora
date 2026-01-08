"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProject } from "@/app/_actions/projectActions";
import { Project } from "@/app/_dataTypes/types";
import Modal from "./Modal";
import { ErrorMessage } from "./ErrorMessage";
import { FormInput, FormTextarea } from "./FormInputs";
import SubmitFormButton from "./SubmitFormButton";

export default function EditProjectModal({
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

          const result = await updateProject(formData);

          if (result?.error) {
            setError(result.error);
            return;
          }

          onClose();
          router.refresh();
        }}
      >
        <h3 className="text-xl font-semibold mb-4">Edit Project</h3>
        {error && <ErrorMessage message={error} />}
        <input type="hidden" name="id" value={project.id} />
        <FormInput
          name="name"
          placeholder="Project name"
          defaultValue={project.name}
          required
        />
        <FormTextarea
          name="projectDescription"
          placeholder="Project description"
          defaultValue={project.projectDescription}
          rows={3}
          required
        />
        <SubmitFormButton actionType="edit" onClose={onClose} />
      </form>
    </Modal>
  );
}
