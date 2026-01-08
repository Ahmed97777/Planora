"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { TaskPriority } from "@/app/_dataTypes/types";
import SearchInput from "./SearchInput";
import FilterSelect from "./FilterSelect";

export default function DashboardTopBar({
  initialSearch = "",
  initialPriority = "all",
}: {
  initialSearch?: string;
  initialPriority?: TaskPriority | "all" | string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [filterPriority, setFilterPriority] = useState<TaskPriority | "all">(
    initialPriority as TaskPriority | "all"
  );
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const searchParameters = searchParams;
    if (!searchParameters) return;

    const searchValue = searchParameters.get("search") ?? "";
    const priorityValue =
      (searchParameters.get("priority") as TaskPriority) ?? "all";

    setSearchQuery(searchValue);
    setFilterPriority(priorityValue);
  }, [searchParams]);

  const makeQuery = (nextSearch: string, nextPriority: string) => {
    const params = new URLSearchParams(
      Array.from(searchParams ?? new URLSearchParams())
    );
    if (nextSearch) params.set("search", nextSearch);
    else params.delete("search");

    if (nextPriority && nextPriority !== "all")
      params.set("priority", nextPriority);
    else params.delete("priority");

    const queries = params.toString();
    return queries ? `?${queries}` : "";
  };

  const areQueryParamsSame = (nextSearch: string, nextPriority: string) => {
    const currentQuery =
      (typeof window !== "undefined"
        ? window.location.search
        : searchParams?.toString() ?? "") ?? "";

    const nextQuery = makeQuery(nextSearch, nextPriority);
    return currentQuery === nextQuery;
  };

  const scheduleNavigate = (nextSearch: string, nextPriority: string) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      if (areQueryParamsSame(nextSearch, nextPriority)) {
        return;
      }

      startTransition(() => {
        const params = new URLSearchParams(
          Array.from(searchParams ?? new URLSearchParams())
        );
        if (nextSearch) params.set("search", nextSearch);
        else params.delete("search");

        if (nextPriority && nextPriority !== "all")
          params.set("priority", nextPriority);
        else params.delete("priority");

        const qs = params.toString();
        const url = qs ? `${pathname}?${qs}` : pathname;
        router.replace(url);
      });
    }, 300);
  };

  useEffect(() => {
    scheduleNavigate(searchQuery, filterPriority as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterPriority]);

  return (
    <header className="bg-primary-900 border-b border-primary-800 px-8 py-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <SearchInput
            searchQuery={searchQuery}
            filterPriority={filterPriority}
            setSearchQuery={setSearchQuery}
            scheduleNavigate={scheduleNavigate}
            isPending={isPending}
          />
        </div>

        <FilterSelect
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          isPending={isPending}
        />
      </div>
    </header>
  );
}
