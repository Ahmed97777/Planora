import { TaskPriority } from "@/app/_dataTypes/types";
import { SetStateAction } from "react";
import SpinnerTiny from "../SpinnerTiny";

interface FilterSelectProps {
  filterPriority: "all" | TaskPriority;
  setFilterPriority: (value: SetStateAction<"all" | TaskPriority>) => void;
  isPending: boolean;
}

export default function FilterSelect({
  filterPriority,
  setFilterPriority,
  isPending,
}: FilterSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <select
        value={filterPriority}
        onChange={(e) => {
          const v = e.target.value as TaskPriority | "all";
          setFilterPriority(v);
        }}
        disabled={isPending}
        className={`w-44 px-4 py-2 border border-primary-700 rounded-sm text-primary-100 focus:outline-none focus:border-accent-500 ${
          isPending ? "bg-primary-700 cursor-not-allowed" : "bg-primary-800"
        }`}
      >
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {isPending && <SpinnerTiny />}
    </div>
  );
}
