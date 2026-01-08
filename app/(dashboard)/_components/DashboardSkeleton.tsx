export default function DashboardSkeleton() {
  return (
    <div className="flex h-screen w-full bg-primary-950 text-primary-100">
      {/* Sidebar */}
      <aside className="w-72 flex flex-col border-r border-primary-800 bg-primary-900">
        {/* Header */}
        <div className="h-16 border-b border-primary-800 p-4 animate-pulse">
          <div className="h-6 w-3/4 bg-primary-800 rounded"></div>
        </div>

        {/* New Project Button */}
        <div className="p-4 shrink-0">
          <div className="h-12 w-full bg-accent-600/50 rounded-sm"></div>
        </div>

        {/* Projects Title */}
        <div className="px-4 mt-3 shrink-0">
          <div className="h-4 w-1/3 bg-primary-800 rounded"></div>
        </div>

        {/* Projects List */}
        <div className="flex-1 overflow-y-auto px-4 min-h-0 animate-pulse">
          <div className="space-y-1 py-4">
            {/* All Projects button */}
            <div className="w-full flex items-center gap-3 px-4 py-3 bg-primary-800/30 rounded-sm">
              <div className="w-5 h-5 bg-primary-700 rounded"></div>
              <div className="h-4 w-2/3 bg-primary-700 rounded"></div>
              <div className="h-4 w-1/4 bg-primary-700 rounded ml-auto"></div>
            </div>

            {/* Project items */}
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-primary-800/20 rounded-sm"
                >
                  <div className="w-3 h-3 rounded-full bg-primary-700"></div>
                  <div className="h-4 w-3/4 bg-primary-700 rounded"></div>
                  <div className="h-4 w-1/5 bg-primary-700 rounded ml-auto"></div>
                </div>
              ))}
          </div>
        </div>

        {/* User Info */}
        <div className="shrink-0 p-4 border-t border-primary-800 animate-pulse">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-accent-600/50"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 w-2/3 bg-primary-700 rounded"></div>
              <div className="h-2 w-1/2 bg-primary-700/70 rounded"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Top Bar */}
        <header className="shrink-0 bg-primary-900 border-b border-primary-800 px-8 py-4 animate-pulse">
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 relative">
              <div className="h-10 w-full bg-primary-800 rounded-sm"></div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="h-10 w-32 bg-primary-800 rounded-sm"></div>
              <div className="h-10 w-32 bg-primary-800 rounded-sm"></div>
            </div>
          </div>
        </header>

        {/* Kanban Board */}
        <main className="flex-1 overflow-auto p-8 w-full animate-pulse">
          {/* Project Header */}
          <div className="mb-8 w-full">
            <div className="h-8 w-1/4 bg-primary-800 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-primary-800/50 rounded"></div>
          </div>

          {/* Kanban Columns Container */}
          <div className="flex w-full flex-1 min-h-0 gap-6">
            {Array(3)
              .fill(0)
              .map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="flex-1 flex flex-col min-w-70 min-h-0"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-4 w-full">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary-800"></div>
                      <div className="h-6 w-24 bg-primary-800 rounded"></div>
                      <div className="h-6 w-8 bg-primary-800/70 rounded-md"></div>
                    </div>
                    <div className="h-8 w-24 bg-accent-600/30 rounded-sm"></div>
                  </div>

                  {/* Task Cards */}
                  <div className="flex-1 overflow-y-auto px-2 space-y-3 min-h-0 w-full">
                    {Array((colIndex % 3) + 2)
                      .fill(0)
                      .map((_, cardIndex) => (
                        <div
                          key={cardIndex}
                          className="bg-primary-900 border border-primary-800 rounded-sm p-4 w-full h-32 space-y-3"
                        >
                          <div className="flex justify-between w-full">
                            <div className="h-5 flex-1 max-w-[70%] bg-primary-800 rounded"></div>
                            <div className="h-8 w-8 bg-primary-800/50 rounded ml-2"></div>
                          </div>
                          <div className="h-3 w-full bg-primary-800/50 rounded"></div>
                          <div className="h-3 w-4/5 bg-primary-800/50 rounded"></div>
                          <div className="flex items-center justify-between mt-2 w-full">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-primary-700"></div>
                              <div className="h-4 w-16 bg-primary-800/50 rounded-md"></div>
                            </div>
                            <div className="h-6 w-20 bg-primary-800/50 rounded-full"></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}
