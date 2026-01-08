import { TaskPriority } from "@/app/_dataTypes/types";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface SearchInputProps {
  searchQuery: string;
  filterPriority: "all" | TaskPriority;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  scheduleNavigate: (nextSearch: string, nextPriority: string) => void;
  isPending: boolean;
}

export default function SearchInput({
  searchQuery,
  setSearchQuery,
  scheduleNavigate,
  filterPriority,
  isPending,
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400 pointer-events-none"
        size={20}
      />

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => {
          const v = e.target.value;
          setSearchQuery(v);
          scheduleNavigate(v, filterPriority as string);
        }}
        className={`w-full pl-10 pr-9 py-2 border-primary-700 rounded-sm text-primary-100 placeholder:text-primary-400 focus:outline-none focus:border-accent-500 ${
          isPending ? "bg-primary-700 cursor-not-allowed" : "bg-primary-800"
        }`}
      />
    </div>
  );
}
