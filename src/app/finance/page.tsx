import AppShell from "../components/AppShell";

import {
  ArrowDownRight,
  ArrowUpRight,
  IndianRupee,
  Receipt,
  Wallet,
} from "lucide-react";

const transactions = [
  {
    title: "Client Payment",
    company: "Reliance Industries",
    amount: "+₹2,40,000",
    type: "income",
    date: "Today",
  },

  {
    title: "Office Expenses",
    company: "Workspace Infrastructure",
    amount: "-₹18,400",
    type: "expense",
    date: "Yesterday",
  },

  {
    title: "GST Payment",
    company: "Government Tax",
    amount: "-₹52,000",
    type: "expense",
    date: "2 days ago",
  },

  {
    title: "Consulting Revenue",
    company: "Tata Motors",
    amount: "+₹1,20,000",
    type: "income",
    date: "3 days ago",
  },
];

export default function FinancePage() {
  return (
    <AppShell>
      {/* HEADER */}

      <div className="mb-10 flex items-start justify-between">
        <div>
          <h1 className="page-title">
            Finance Overview
          </h1>

          <p className="page-subtitle">
            Track revenue, expenses, invoices and business
            cashflow.
          </p>
        </div>

        <button className="rounded-2xl bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-400">
          Generate Invoice
        </button>
      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-4 gap-6">
        {/* REVENUE */}

        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="card-title">
                Total Revenue
              </p>

              <h2 className="card-value">
                ₹12.4L
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <IndianRupee className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-emerald-300">
            <ArrowUpRight className="h-4 w-4" />

            +18% growth this month
          </div>
        </div>

        {/* EXPENSES */}

        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="card-title">
                Expenses
              </p>

              <h2 className="card-value">
                ₹2.1L
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
              <Wallet className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-red-300">
            <ArrowDownRight className="h-4 w-4" />

            Operational expenses
          </div>
        </div>

        {/* INVOICES */}

        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="card-title">
                Pending Invoices
              </p>

              <h2 className="card-value">
                14
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
              <Receipt className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-5 text-sm text-orange-300">
            ₹3.8L awaiting payment
          </div>
        </div>

        {/* CASHFLOW */}

        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="card-title">
                Net Cashflow
              </p>

              <h2 className="card-value">
                ₹9.7L
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <Wallet className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-5 text-sm text-zinc-400">
            Stable financial performance
          </div>
        </div>
      </div>

      {/* MAIN SECTION */}

      <div className="mt-10 grid grid-cols-12 gap-6">
        {/* TRANSACTIONS */}

        <div className="glass-card col-span-8 rounded-3xl p-7">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="section-title">
                Recent Transactions
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Latest financial activity
              </p>
            </div>

            <button className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.05]">
              Export
            </button>
          </div>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.title}
                className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] p-5"
              >
                <div>
                  <h3 className="font-medium">
                    {transaction.title}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-500">
                    {transaction.company}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.type === "income"
                        ? "text-emerald-300"
                        : "text-red-300"
                    }`}
                  >
                    {transaction.amount}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    {transaction.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="glass-card col-span-4 rounded-3xl p-7">
          <h2 className="section-title">
            AI Finance Insights
          </h2>

          <div className="mt-6 space-y-5">
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
              <p className="text-sm leading-relaxed text-zinc-300">
                Revenue increased by 18% compared to
                previous month.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
              <p className="text-sm leading-relaxed text-zinc-300">
                3 invoices are overdue for more than 15
                days.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
              <p className="text-sm leading-relaxed text-zinc-300">
                AI predicts positive cashflow growth next
                quarter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}