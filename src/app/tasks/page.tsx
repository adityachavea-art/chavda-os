import AppShell from "../components/AppShell";

import {
  Plus,
  Clock3,
  CircleDashed,
  CheckCircle2,
} from "lucide-react";

const todoTasks = [
  {
    title: "Prepare GST Filing",
    priority: "High",
    due: "Today",
  },

  {
    title: "Client Follow-up Call",
    priority: "Medium",
    due: "Tomorrow",
  },
];

const progressTasks = [
  {
    title: "AI Automation Setup",
    priority: "High",
    due: "2 days left",
  },

  {
    title: "Financial Report Review",
    priority: "Medium",
    due: "4 days left",
  },
];

const completedTasks = [
  {
    title: "Invoice Processing",
    priority: "Completed",
    due: "Done",
  },

  {
    title: "CRM Data Cleanup",
    priority: "Completed",
    due: "Done",
  },
];

export default function TasksPage() {
  return (
    <AppShell>
      {/* HEADER */}

      <div className="mb-10 flex items-start justify-between">
        <div>
          <h1 className="page-title">
            Task Workspace
          </h1>

          <p className="page-subtitle">
            Manage productivity, workflows and team
            operations.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-400">
          <Plus className="h-4 w-4" />

          Create Task
        </button>
      </div>

      {/* STATS */}

      <div className="mb-8 grid grid-cols-4 gap-6">
        <div className="glass-card rounded-3xl p-6">
          <p className="card-title">
            Total Tasks
          </p>

          <h2 className="card-value">
            48
          </h2>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <p className="card-title">
            In Progress
          </p>

          <h2 className="card-value">
            12
          </h2>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <p className="card-title">
            Completed
          </p>

          <h2 className="card-value">
            31
          </h2>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <p className="card-title">
            Productivity
          </p>

          <h2 className="card-value">
            92%
          </h2>
        </div>
      </div>

      {/* BOARD */}

      <div className="grid grid-cols-3 gap-6">
        {/* TODO */}

        <div className="glass-card rounded-3xl p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CircleDashed className="h-5 w-5 text-zinc-400" />

              <h2 className="section-title">
                To Do
              </h2>
            </div>

            <span className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-zinc-400">
              {todoTasks.length}
            </span>
          </div>

          <div className="space-y-4">
            {todoTasks.map((task) => (
              <div
                key={task.title}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition hover:bg-white/[0.05]"
              >
                <h3 className="font-medium">
                  {task.title}
                </h3>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-300">
                    {task.priority}
                  </span>

                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Clock3 className="h-4 w-4" />

                    {task.due}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROGRESS */}

        <div className="glass-card rounded-3xl p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-orange-400" />

              <h2 className="section-title">
                In Progress
              </h2>
            </div>

            <span className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-zinc-400">
              {progressTasks.length}
            </span>
          </div>

          <div className="space-y-4">
            {progressTasks.map((task) => (
              <div
                key={task.title}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition hover:bg-white/[0.05]"
              >
                <h3 className="font-medium">
                  {task.title}
                </h3>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-300">
                    {task.priority}
                  </span>

                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Clock3 className="h-4 w-4" />

                    {task.due}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DONE */}

        <div className="glass-card rounded-3xl p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />

              <h2 className="section-title">
                Completed
              </h2>
            </div>

            <span className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-zinc-400">
              {completedTasks.length}
            </span>
          </div>

          <div className="space-y-4">
            {completedTasks.map((task) => (
              <div
                key={task.title}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition hover:bg-white/[0.05]"
              >
                <h3 className="font-medium">
                  {task.title}
                </h3>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                    {task.priority}
                  </span>

                  <div className="text-sm text-zinc-500">
                    {task.due}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}