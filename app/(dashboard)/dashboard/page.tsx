import { Suspense } from "react";
import DashboardSkeleton from "../_components/DashboardSkeleton";
import DashboardContent from "../_components/DashboardContent";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const searchParameters = await searchParams;

  return (
    <div className="flex flex-1 overflow-hidden bg-primary-950 text-primary-100 h-screen">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent searchParameters={searchParameters ?? {}} />
      </Suspense>
    </div>
  );
}
