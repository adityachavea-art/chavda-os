"use client";

import {
  Search,
  Plus,
  Phone,
  CalendarDays,
  MessageCircle,
  IndianRupee,
  FileText,
} from "lucide-react";

const clients = [
  {
    name: "Mahesh Patel",
    work: "GST Return Filing",
    phone: "+91 9876543210",
    due: "25 May 2026",
    payment: "₹3,500 Pending",
    status: "Reminder Due",
  },
  {
    name: "Raj Traders",
    work: "TDS Return Filing",
    phone: "+91 9988776655",
    due: "28 May 2026",
    payment: "Paid",
    status: "Completed",
  },
  {
    name: "Amit Shah",
    work: "ITR Filing",
    phone: "+91 9123456789",
    due: "30 May 2026",
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
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
            Aditya Personal Workspace
          </p>

          <h1 className="mt-3 text-6xl font-black tracking-tight">
            Client Reminders
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            GST, TDS, ITR, reminders, payments and WhatsApp
            follow-ups in one fast personal dashboard.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-[320px] items-center gap-3 rounded-2xl border border-white/10 bg-[#111318] px-4">
            <Search className="h-4 w-4 text-zinc-500" />

            <input
              placeholder="Search client..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
            />
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-medium transition hover:bg-blue-500">
            <Plus className="h-4 w-4" />

            Add Client
          </button>
        </div>
      </div>

      {/* STATS */}

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-[#111318] p-6">
          <div className="flex items-center gap-3">
            <IndianRupee className="h-6 w-6 text-green-400" />

            <p className="text-zinc-400">
              Pending Payments
            </p>
          </div>

          <h2 className="mt-4 text-5xl font-black text-green-400">
            ₹5,500
          </h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111318] p-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-6 w-6 text-orange-400" />

            <p className="text-zinc-400">
              Upcoming Due Dates
            </p>
          </div>

          <h2 className="mt-4 text-5xl font-black text-orange-400">
            3
          </h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111318] p-6">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-blue-400" />

            <p className="text-zinc-400">
              Active Clients
            </p>
          </div>

          <h2 className="mt-4 text-5xl font-black text-blue-400">
            12
          </h2>
        </div>
      </div>

      {/* CLIENTS */}

      <div className="mt-10 grid gap-6">
        {clients.map((client) => (
          <div
            key={client.name}
            className="rounded-3xl border border-white/10 bg-[#111318] p-7 transition hover:border-blue-500/30"
          >
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-3xl font-bold">
                  {client.name}
                </h2>

                <p className="mt-3 text-lg text-zinc-400">
                  {client.work}
                </p>

                <div className="mt-5 flex flex-wrap gap-5 text-sm text-zinc-500">
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

              <div className="flex flex-col items-start gap-4 xl:items-end">
                <div className="text-2xl font-bold text-green-400">
                  {client.payment}
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    client.status === "Completed"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : client.status === "Reminder Due"
                      ? "bg-orange-500/10 text-orange-400"
                      : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {client.status}
                </span>

                <button className="flex items-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold transition hover:bg-green-500">
                  <MessageCircle className="h-4 w-4" />

                  Send WhatsApp Reminder
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}