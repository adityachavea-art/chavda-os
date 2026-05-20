import {
  Sparkles,
  Send,
  Bot,
  BrainCircuit,
  Wand2,
  Clock3,
} from "lucide-react";

const suggestions = [
  "Generate monthly business report",
  "Analyze pending invoices",
  "Create AI productivity workflow",
  "Summarize CRM performance",
];

const activities = [
  {
    title: "Financial report generated",
    time: "2 min ago",
  },
  {
    title: "Client analytics updated",
    time: "12 min ago",
  },
  {
    title: "Workflow automation synced",
    time: "28 min ago",
  },
];

export default function AIPage() {
  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-violet-400">
            AI Workspace
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight">
            AI Assistant
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Intelligent business automation, AI insights and
            smart workflow management powered by enterprise
            AI systems.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/10 px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

            <span className="text-sm font-medium text-emerald-300">
              AI Engine Online
            </span>
          </div>
        </div>
      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* CHAT */}

        <div className="xl:col-span-2 rounded-3xl border border-white/[0.06] bg-[#111318]">
          {/* CHAT HEADER */}

          <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
            <div>
              <h3 className="text-2xl font-bold">
                AI Conversation
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Smart enterprise business assistant
              </p>
            </div>

            <button className="rounded-2xl border border-white/[0.06] bg-[#0B0D11] px-4 py-2 text-sm text-zinc-400 transition hover:text-white">
              New Session
            </button>
          </div>

          {/* MESSAGES */}

          <div className="space-y-6 p-6">
            {/* AI */}

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10">
                <Bot className="h-6 w-6 text-violet-400" />
              </div>

              <div className="max-w-[80%] rounded-3xl border border-white/[0.06] bg-[#0B0D11] p-5">
                <p className="leading-relaxed text-zinc-300">
                  Welcome back, Aditya. Revenue has
                  increased by 18% this month and AI
                  automation improved workflow efficiency
                  across CRM and finance modules.
                </p>
              </div>
            </div>

            {/* USER */}

            <div className="flex justify-end">
              <div className="max-w-[75%] rounded-3xl bg-violet-500 px-5 py-4">
                <p className="leading-relaxed text-white">
                  Generate monthly business summary and
                  performance insights.
                </p>
              </div>
            </div>

            {/* AI */}

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10">
                <BrainCircuit className="h-6 w-6 text-blue-400" />
              </div>

              <div className="max-w-[80%] rounded-3xl border border-white/[0.06] bg-[#0B0D11] p-5">
                <p className="leading-relaxed text-zinc-300">
                  Business performance remains stable with
                  strong client retention, improved
                  cashflow and increased operational
                  productivity. AI systems detected growth
                  opportunities in enterprise consulting
                  workflows.
                </p>
              </div>
            </div>
          </div>

          {/* INPUT */}

          <div className="border-t border-white/[0.06] p-5">
            <div className="flex items-center gap-4 rounded-3xl border border-white/[0.06] bg-[#0B0D11] p-3">
              <input
                placeholder="Ask AI about finance, CRM, analytics or productivity..."
                className="h-12 w-full bg-transparent px-2 text-sm outline-none placeholder:text-zinc-500"
              />

              <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500 text-white transition hover:bg-violet-400">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="space-y-6">
          {/* SUGGESTIONS */}

          <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
            <div className="flex items-center gap-3">
              <Wand2 className="h-5 w-5 text-violet-400" />

              <h3 className="text-xl font-bold">
                AI Suggestions
              </h3>
            </div>

            <div className="mt-6 space-y-3">
              {suggestions.map((item) => (
                <button
                  key={item}
                  className="w-full rounded-2xl border border-white/[0.06] bg-[#0B0D11] p-4 text-left text-sm text-zinc-300 transition hover:border-violet-500/20 hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIVITY */}

          <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-blue-400" />

              <h3 className="text-xl font-bold">
                AI Activity
              </h3>
            </div>

            <div className="mt-6 space-y-4">
              {activities.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/[0.06] bg-[#0B0D11] p-4"
                >
                  <p className="font-medium">
                    {item.title}
                  </p>

                  <p className="mt-2 text-sm text-zinc-500">
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI STATUS */}

          <div className="rounded-3xl border border-violet-500/10 bg-violet-500/10 p-5">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-violet-300" />

              <h3 className="font-semibold text-violet-200">
                Enterprise AI Active
              </h3>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-violet-200/90">
              AI systems are actively monitoring finance,
              CRM, productivity and analytics modules in
              real time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}