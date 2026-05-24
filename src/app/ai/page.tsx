import AppShell from "../components/AppShell";

import {
  Sparkles,
  Send,
  Bot,
  Wand2,
  BrainCircuit,
} from "lucide-react";

const suggestions = [
  "Generate monthly business report",
  "Analyze pending client payments",
  "Create smart productivity workflow",
  "Summarize financial performance",
];

export default function AIPage() {
  return (
    <AppShell>
      {/* HEADER */}

      <div className="mb-10 flex items-start justify-between">
        <div>
          <h1 className="page-title">
            AI Assistant
          </h1>

          <p className="page-subtitle">
            AI-powered business intelligence and workflow
            automation workspace.
          </p>
        </div>

        <div className="glass-card flex items-center gap-3 rounded-2xl px-5 py-3">
          <Sparkles className="h-5 w-5 text-blue-400" />

          <span className="text-sm font-medium text-zinc-300">
            GPT Intelligence Active
          </span>
        </div>
      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT */}

        <div className="glass-card col-span-8 rounded-3xl p-7">
          {/* CHAT HEADER */}

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="section-title">
                AI Workspace
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Ask AI anything about your business.
              </p>
            </div>

            <button className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.05]">
              New Session
            </button>
          </div>

          {/* AI MESSAGE */}

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
                <Bot className="h-6 w-6" />
              </div>

              <div className="max-w-[80%] rounded-3xl border border-white/5 bg-white/[0.03] p-5">
                <p className="leading-relaxed text-zinc-300">
                  Welcome back, Aditya. Your revenue has
                  increased by 18% this month and 4
                  enterprise clients require immediate
                  follow-up.
                </p>
              </div>
            </div>

            {/* USER MESSAGE */}

            <div className="flex justify-end">
              <div className="max-w-[75%] rounded-3xl bg-blue-500 px-5 py-4">
                <p className="leading-relaxed text-white">
                  Generate this month’s business summary.
                </p>
              </div>
            </div>

            {/* AI RESPONSE */}

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400">
                <BrainCircuit className="h-6 w-6" />
              </div>

              <div className="max-w-[80%] rounded-3xl border border-white/5 bg-white/[0.03] p-5">
                <p className="leading-relaxed text-zinc-300">
                  Monthly business performance remains
                  strong with stable cashflow and improved
                  client retention. AI automation reduced
                  operational workload by approximately
                  37%.
                </p>
              </div>
            </div>
          </div>

          {/* INPUT */}

          <div className="mt-8 flex items-center gap-4 rounded-3xl border border-white/5 bg-white/[0.03] p-4">
            <input
              placeholder="Ask AI about analytics, finance, CRM or productivity..."
              className="w-full bg-transparent text-sm placeholder:text-zinc-500"
            />

            <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white transition hover:bg-blue-400">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* RIGHT */}

        <div className="glass-card col-span-4 rounded-3xl p-7">
          <div className="mb-6 flex items-center gap-3">
            <Wand2 className="h-5 w-5 text-blue-400" />

            <h2 className="section-title">
              AI Suggestions
            </h2>
          </div>

          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                className="w-full rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-left text-sm text-zinc-300 transition hover:bg-white/[0.05]"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* AI STATUS */}

          <div className="mt-8 rounded-3xl border border-emerald-500/10 bg-emerald-500/10 p-5">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-emerald-400" />

              <span className="text-sm font-medium text-emerald-300">
                AI Engine Online
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              All automation systems and business
              intelligence services are operational.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}