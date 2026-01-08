import { AlertTriangle } from "lucide-react";

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="mb-4 p-3 rounded bg-red-600/20 text-red-400 border border-red-500/40 text-sm flex items-start gap-2">
      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
}
