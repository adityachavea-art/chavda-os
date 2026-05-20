import {
  Plus,
  Clock3,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react";

const columns = [
  {
    title: "Todo",
    color: "bg-zinc-500",
    tasks: [
      {
        id: "CHV-201",
        title: "Prepare GST filing report",
        priority: "High",
        due: "Today",
      },
      {
        id: "CHV-202",
        title: "Review client onboarding workflow",
        priority: "Medium",
        due: "Tomorrow",
      },
    ],
  },
  {
    title: "In Progress",
    color: "bg-blue-500",
    tasks: [
      {
        id: "CHV-203",
        title: "Build AI automation dashboard",
        priority: "Urgent",
        due: "May 20",
      },
      {
        id: "CHV-204",
        title: "Integrate Firebase database",
        priority: "High",
        due: "May 22",
      },
    ],
  },
  {
    title: "Completed",
    color: "bg-emerald-500",
    tasks: [
      {
        id: "CHV-205",
        title: "Design enterprise AppShell",
        priority: "Done",
        due: "Completed",
      },
    ],
  },
];

export default function TasksPage() {
  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-400">
            Productivity Workspace
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight">
            Task Management
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Organize projects, manage workflows and monitor
            business operations with an enterprise task
            system.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-medium transition hover:bg-blue-400">
          <Plus className="h-4 w-4" />

          Create Task
        </button>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
              <Clock3 className="h-7 w-7 text-blue-400" />
            </div>

            <span className="text-sm text-zinc-500">
              Active
            </span>
          </div>

          <h2 className="mt-6 text-5xl font-black">
            18
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Ongoing tasks
          </p>
        </div>

        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10">
            <AlertCircle className="h-7 w-7 text-orange-400" />
          </div>

          <h2 className="mt-6 text-5xl font-black">
            6
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Pending reviews
          </p>
        </div>

        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
            <CheckCircle2 className="h-7 w-7 text-emerald-400" />
          </div>

          <h2 className="mt-6 text-5xl font-black">
            142
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Completed tasks
          </p>
        </div>
      </div>

      {/* BOARD */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {columns.map((column) => (
          <div
            key={column.title}
            className="rounded-3xl border border-white/[0.06] bg-[#111318]"
          >
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
              <div className="flex items-center gap-3">
                <div
                  className={`h-3 w-3 rounded-full ${column.color}`}
                />

                <h3 className="text-lg font-bold">
                  {column.title}
                </h3>
              </div>

              <span className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-zinc-400">
                {column.tasks.length}
              </span>
            </div>

            {/* TASKS */}

            <div className="space-y-4 p-5">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-2xl border border-white/[0.06] bg-[#0B0D11] p-5 transition hover:border-blue-500/20"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-medium text-zinc-500">
                      {task.id}
                    </span>

                    <button className="text-zinc-500 transition hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  <h4 className="mt-4 text-lg font-semibold leading-relaxed">
                    {task.title}
                  </h4>

                  <div className="mt-6 flex items-center justify-between">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        task.priority === "Urgent"
                          ? "bg-red-500/10 text-red-400"
                          : task.priority === "High"
                          ? "bg-orange-500/10 text-orange-400"
                          : task.priority === "Done"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      {task.priority}
                    </span>

                    <span className="text-sm text-zinc-500">
                      {task.due}
                    </span>
                  </div>
                </div>
              ))}

              <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/[0.08] py-4 text-sm text-zinc-500 transition hover:border-blue-500/20 hover:text-white">
                <Plus className="h-4 w-4" />

                Add new task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}