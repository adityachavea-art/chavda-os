"use client";

import {
  Search,
  Plus,
  Phone,
  CalendarDays,
  MessageCircle,
} from "lucide-react";

const clients = [
  {
    name: "Mahesh Patel",
    work: "GST Return Filing",
    phone: "+91 9876543210",
    due: "25 May",
    payment: "₹3,500 Pending",
    status: "Reminder Due",
  },
  {
    name: "Raj Traders",
    work: "TDS Return",
    phone: "+91 9988776655",
    due: "28 May",
    payment: "Paid",
    status: "Completed",
  },
  {
    name: "Amit Shah",
    work: "ITR Filing",
    phone: "+91 9123456789",
    due: "30 May",
    payment: "₹2,000 Pending",
    status: "Pending Docs",
  },
];

export default function CRMPage() {
  return (
    <div className="min-h-screen bg-black p-8 text-white">
      {/* HEADER */}

      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-400">
            Personal Workspace
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight">
            Client Reminders
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Manage GST, ITR, TDS work, reminders and payments
            from one clean personal dashboard.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-[320px] items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#111318] px-4">
            <Search className="h-4 w-4 text-zinc-500" />

            <input
              placeholder="Search client..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
            />
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-medium transition hover:bg-blue-400">
            <Plus className="h-4 w-4" />

            Add Client
          </button>
        </div>
      </div>

      {/* CLIENT LIST */}

      <div className="mt-8 grid gap-6">
        {clients.map((client) => (
          <div
            key={client.name}
            className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6"
          >
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {client.name}
                </h2>

                <p className="mt-2 text-zinc-400">
                  {client.work}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />

                    {client.phone}
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />

                    Due: {client.due}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 xl:items-end">
                <div className="text-lg font-semibold">
                  {client.payment}
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-xs font-medium ${
                    client.status === "Completed"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : client.status === "Reminder Due"
                      ? "bg-orange-500/10 text-orange-400"
                      : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {client.status}
                </span>

                <button className="mt-2 flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-400">
                  <MessageCircle className="h-4 w-4" />

                  WhatsApp Reminder
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}