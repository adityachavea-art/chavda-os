import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Landmark,
  Wallet,
  Receipt,
} from "lucide-react";

const transactions = [
  {
    title: "Client Payment",
    company: "Reliance Industries",
    amount: "+₹4,20,000",
    type: "income",
    date: "Today",
  },
  {
    title: "Office Expense",
    company: "Workspace Utilities",
    amount: "-₹18,000",
    type: "expense",
    date: "Yesterday",
  },
  {
    title: "Software Subscription",
    company: "OpenAI API Billing",
    amount: "-₹7,500",
    type: "expense",
    date: "2 days ago",
  },
  {
    title: "Consulting Revenue",
    company: "Tata Motors",
    amount: "+₹2,80,000",
    type: "income",
    date: "3 days ago",
  },
];

export default function FinancePage() {
  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">
            Financial Management
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight">
            Finance Dashboard
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Track revenue, monitor cashflow, manage invoices
            and analyze business finances in real time.
          </p>
        </div>

        <button className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-medium text-black transition hover:bg-emerald-400">
          Generate Report
        </button>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
              <Wallet className="h-7 w-7 text-emerald-400" />
            </div>

            <div className="flex items-center gap-1 text-xs font-medium text-emerald-400">
              <ArrowUpRight className="h-3 w-3" />

              +18%
            </div>
          </div>

          <p className="mt-6 text-sm text-zinc-500">
            Total Revenue
          </p>

          <h2 className="mt-2 text-4xl font-black">
            ₹12.4L
          </h2>
        </div>

        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
            <Landmark className="h-7 w-7 text-blue-400" />
          </div>

          <p className="mt-6 text-sm text-zinc-500">
            Bank Balance
          </p>

          <h2 className="mt-2 text-4xl font-black">
            ₹8.7L
          </h2>
        </div>

        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10">
            <Receipt className="h-7 w-7 text-orange-400" />
          </div>

          <p className="mt-6 text-sm text-zinc-500">
            Pending Invoices
          </p>

          <h2 className="mt-2 text-4xl font-black">
            24
          </h2>
        </div>

        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10">
            <CreditCard className="h-7 w-7 text-purple-400" />
          </div>

          <p className="mt-6 text-sm text-zinc-500">
            Monthly Expenses
          </p>

          <h2 className="mt-2 text-4xl font-black">
            ₹1.2L
          </h2>
        </div>
      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* CASHFLOW */}

        <div className="xl:col-span-2 rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">
                Cashflow Overview
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Revenue and expense performance
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-8">
            <div>
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-zinc-400">
                  Revenue Growth
                </span>

                <span className="font-medium">
                  78%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full w-[78%] rounded-full bg-emerald-500" />
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-zinc-400">
                  Profit Margin
                </span>

                <span className="font-medium">
                  64%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full w-[64%] rounded-full bg-blue-500" />
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-zinc-400">
                  Expense Ratio
                </span>

                <span className="font-medium">
                  32%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full w-[32%] rounded-full bg-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* INSIGHTS */}

        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <h3 className="text-2xl font-bold">
            Financial Insights
          </h3>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/10 p-4">
              <p className="text-sm font-medium text-emerald-300">
                Revenue increased by 18% compared to last
                month.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-500/10 bg-orange-500/10 p-4">
              <p className="text-sm font-medium text-orange-300">
                24 invoices remain pending for collection.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-500/10 bg-blue-500/10 p-4">
              <p className="text-sm font-medium text-blue-300">
                AI predicts positive cashflow for next
                quarter.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TRANSACTIONS */}

      <div className="rounded-3xl border border-white/[0.06] bg-[#111318]">
        <div className="border-b border-white/[0.06] px-6 py-5">
          <h3 className="text-2xl font-bold">
            Recent Transactions
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Latest financial activities and payments
          </p>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {transactions.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between px-6 py-5"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    item.type === "income"
                      ? "bg-emerald-500/10"
                      : "bg-red-500/10"
                  }`}
                >
                  {item.type === "income" ? (
                    <ArrowDownRight className="h-6 w-6 text-emerald-400" />
                  ) : (
                    <ArrowUpRight className="h-6 w-6 text-red-400" />
                  )}
                </div>

                <div>
                  <p className="font-semibold">
                    {item.title}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    {item.company}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`text-lg font-bold ${
                    item.type === "income"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {item.amount}
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}