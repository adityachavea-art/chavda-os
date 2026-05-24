"use client";

import {
  Bell,
  CheckCircle2,
  FileText,
  NotebookPen,
  Plus,
  User,
} from "lucide-react";

const todayTasks = [
  {
    title: "File GSTR-1 for Mahadev Traders",
    time: "10:30 AM",
    status: "Pending",
  },
  {
    title: "Call client for GST notice",
    time: "12:00 PM",
    status: "Important",
  },
  {
    title: "Send invoice to Rakesh Patel",
    time: "3:15 PM",
    status: "Done",
  },
];

const reminders = [
  {
    client: "Jay Enterprise",
    work: "GST Return",
    due: "Tomorrow",
  },
  {
    client: "Amit Shah",
    work: "ITR Filing",
    due: "22 May",
  },
  {
    client: "Pooja Textile",
    work: "Payment Follow-up",
    due: "Today",
  },
];

const quickNotes = [
  "Renew DSC before month end",
  "Call GST officer regarding notice",
  "Check pending TDS entries",
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* HERO */}

      <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-400">
              Personal Workspace
            </p>

            <h1 className="mt-4 text-5xl font-black tracking-tight">
              Welcome back, Aditya 👋
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-zinc-400">
              Manage your daily work, reminders, invoices,
              follow-ups and notes from one clean workspace.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 font-medium text-white transition hover:opacity-90">
              <Plus className="h-5 w-5" />
              Add Task
            </button>

            <button className="flex items-center gap-2 rounded-2xl border border-white/[0.08] px-5 py-3 text-zinc-300 transition hover:bg-white/[0.04]">
              <FileText className="h-5 w-5" />
              New Invoice
            </button>
          </div>
        </div>
      </div>

      {/* QUICK STATS */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
              <CheckCircle2 className="h-7 w-7 text-blue-400" />
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Today Tasks
              </p>

              <h2 className="text-4xl font-bold">12</h2>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10">
              <Bell className="h-7 w-7 text-orange-400" />
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Pending Reminders
              </p>

              <h2 className="text-4xl font-bold">7</h2>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
              <User className="h-7 w-7 text-emerald-400" />
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Active Clients
              </p>

              <h2 className="text-4xl font-bold">18</h2>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* TASKS */}

        <div className="xl:col-span-2 rounded-3xl border border-white/[0.06] bg-[#111318]">
          <div className="border-b border-white/[0.06] px-6 py-5">
            <h3 className="text-2xl font-bold">
              Today Tasks
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Your important daily work list
            </p>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {todayTasks.map((task) => (
              <div
                key={task.title}
                className="flex items-center justify-between px-6 py-5"
              >
                <div>
                  <h4 className="font-semibold">
                    {task.title}
                  </h4>

                  <p className="mt-1 text-sm text-zinc-500">
                    {task.time}
                  </p>
                </div>

                <span
                  className={`rounded-full px-4 py-1 text-xs font-medium ${
                    task.status === "Done"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : task.status === "Important"
                      ? "bg-orange-500/10 text-orange-400"
                      : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK NOTES */}

        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <div className="flex items-center gap-3">
            <NotebookPen className="h-6 w-6 text-blue-400" />

            <h3 className="text-2xl font-bold">
              Quick Notes
            </h3>
          </div>

          <div className="mt-6 space-y-4">
            {quickNotes.map((note) => (
              <div
                key={note}
                className="rounded-2xl border border-white/[0.06] bg-[#181B21] p-4 text-sm text-zinc-300"
              >
                {note}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REMINDERS */}

      <div className="rounded-3xl border border-white/[0.06] bg-[#111318]">
        <div className="border-b border-white/[0.06] px-6 py-5">
          <h3 className="text-2xl font-bold">
            Client Reminders
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Upcoming follow-ups and pending work
          </p>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {reminders.map((item) => (
            <div
              key={item.client}
              className="flex items-center justify-between px-6 py-5"
            >
              <div>
                <h4 className="font-semibold">
                  {item.client}
                </h4>

                <p className="mt-1 text-sm text-zinc-500">
                  {item.work}
                </p>
              </div>

              <div className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                {item.due}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}