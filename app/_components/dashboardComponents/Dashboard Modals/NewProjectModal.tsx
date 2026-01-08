"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/app/_actions/projectActions";
import SubmitFormButton from "./SubmitFormButton";
import { Plus } from "lucide-react";
import Modal from "./Modal";
import { ErrorMessage } from "./ErrorMessage";
import { FormInput } from "./FormInputs";

export default function NewProjectModal() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);

    const result = await createProject(formData);

    if (result?.error) {
      setError(result.error);
      return;
    }

    setOpen(false);
    router.refresh();
  }

  const onClose = () => {
    setError(null);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-accent-500 text-primary-900 rounded-sm font-semibold hover:bg-accent-600 transition-colors cursor-pointer"
      >
        <Plus size={20} />
        <span>New Project</span>
      </button>

      <Modal isOpen={open} onClose={onClose}>
        <form action={handleSubmit}>
          <h3 className="text-xl font-semibold mb-4">Create New Project</h3>

          {error && <ErrorMessage message={error} />}

          <FormInput name="name" placeholder="Project name" required />

          <FormInput
            name="projectDescription"
            placeholder="Project description"
            required
          />

          <SubmitFormButton actionType="create" onClose={onClose} />
        </form>
      </Modal>
    </>
  );
}
