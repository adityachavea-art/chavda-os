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
    work: "Business Consultation",
    phone: "+91 9988776655",
    due: "28 May 2026",
    payment: "Paid",
    status: "Completed",
  },
  {
    name: "Amit Shah",
    work: "Website Project",
    phone: "+91 9123456789",
    due: "30 May 2026",
    payment: "₹12,000 Pending",
    status: "Pending",
  },
];

export default function CRMPage() {
  return (
    <div className="space-y-8 p-8 bg-black min-h-screen text-white">

      <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
            ADITYA WORKSPACE
          </p>

          <h1 className="mt-3 text-6xl font-black tracking-tight">
            Client Reminders
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
            GST, TDS, ITR, reminders, payments and WhatsApp follow-ups
            in one fast personal dashboard.
          </p>
        </div>

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-[340px] items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#111318] px-5">
            <Search className="h-5 w-5 text-zinc-500" />

            <input
              placeholder="Search client..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
            />
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium text-white transition hover:bg-blue-500">
            <Plus className="h-5 w-5" />
            Add Client
          </button>

        </div>

      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-7">
          <div className="flex items-center gap-3 text-emerald-400">
            <IndianRupee className="h-6 w-6" />
            <p className="text-zinc-400">Pending Payments</p>
          </div>

          <h2 className="mt-4 text-6xl font-black text-emerald-400">
            ₹5,500
          </h2>
        </div>

        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-7">
          <div className="flex items-center gap-3 text-orange-400">
            <CalendarDays className="h-6 w-6" />
            <p className="text-zinc-400">Upcoming Tasks</p>
          </div>

          <h2 className="mt-4 text-6xl font-black text-orange-400">
            3
          </h2>
        </div>

        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-7">
          <div className="flex items-center gap-3 text-blue-400">
            <FileText className="h-6 w-6" />
            <p className="text-zinc-400">Active Clients</p>
          </div>

          <h2 className="mt-4 text-6xl font-black text-blue-400">
            12
          </h2>
        </div>

      </div>

      <div className="space-y-6">

        {clients.map((client) => (

          <div
            key={client.name}
            className="rounded-3xl border border-white/[0.06] bg-[#111318] p-8"
          >

            <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

              <div>

                <h2 className="text-4xl font-black tracking-tight">
                  {client.name}
                </h2>

                <p className="mt-3 text-lg text-zinc-400">
                  {client.work}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-zinc-500">

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

                <div className="text-4xl font-black text-emerald-400">
                  {client.payment}
                </div>

                <span
                  className={`rounded-full px-5 py-2 text-sm font-medium ${
                    client.status === "Completed"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : client.status === "Reminder Due"
                      ? "bg-orange-500/10 text-orange-400"
                      : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {client.status}
                </span>

                <button className="flex items-center gap-3 rounded-2xl bg-green-600 px-6 py-4 text-sm font-medium text-white transition hover:bg-green-500">

                  <MessageCircle className="h-5 w-5" />

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