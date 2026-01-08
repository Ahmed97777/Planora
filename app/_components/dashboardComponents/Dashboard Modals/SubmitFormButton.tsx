import { useFormStatus } from "react-dom";
import SpinnerTiny from "../../SpinnerTiny";

export default function SubmitFormButton({
  actionType,
  onClose,
}: {
  actionType: string;
  onClose: () => void;
}) {
  const { pending } = useFormStatus();
  const textShown =
    actionType === "create"
      ? "Create"
      : actionType === "edit"
      ? "Update"
      : "Delete";

  return (
    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={() => {
          onClose();
        }}
        disabled={pending}
        className="px-4 py-2 border border-primary-700 rounded hover:bg-primary-800 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={pending}
        className="px-4 py-2 w-28 bg-accent-500 text-primary-900 font-semibold rounded hover:bg-accent-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center justify-center">
          {pending ? <SpinnerTiny /> : textShown}
        </div>
      </button>
    </div>
  );
}
