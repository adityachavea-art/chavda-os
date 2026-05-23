"use client";

import { MessageCircle } from "lucide-react";
import type { Client, WhatsAppTemplateId } from "@/lib/types";
import { WHATSAPP_TEMPLATES, buildWhatsAppUrl } from "@/lib/whatsapp-templates";
import { markReminderSent } from "@/lib/services/clients";
import { useActor } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function WhatsAppPanel({
  client,
  uid,
  onTemplateChange,
}: {
  client: Client;
  uid: string;
  onTemplateChange?: (id: WhatsAppTemplateId) => void;
}) {
  const actor = useActor();
  const selected = client.whatsappTemplateId ?? "custom";

  return (
    <div className="glass-card space-y-4 rounded-3xl p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-emerald-400" />
        <h3 className="font-bold">WhatsApp templates</h3>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {WHATSAPP_TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onTemplateChange?.(t.id)}
            className={`rounded-2xl border p-3 text-left transition ${
              selected === t.id
                ? "border-emerald-500/40 bg-emerald-500/10"
                : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
            }`}
          >
            <p className="text-sm font-medium">{t.label}</p>
            <p className="mt-1 text-xs text-zinc-500">{t.description}</p>
          </button>
        ))}
      </div>
      <pre className="max-h-40 overflow-auto rounded-2xl border border-white/5 bg-black/30 p-4 text-xs leading-relaxed text-zinc-400 whitespace-pre-wrap">
        {WHATSAPP_TEMPLATES.find((t) => t.id === selected)?.build(client)}
      </pre>
      <div className="flex flex-col gap-2 sm:flex-row">
        <a
          href={buildWhatsAppUrl(client, selected)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
          onClick={() => toast.success("Opening WhatsApp...")}
        >
          <Button variant="success" className="w-full">
            <MessageCircle className="h-5 w-5" />
            Send via WhatsApp
          </Button>
        </a>
        <Button
          variant="secondary"
          onClick={async () => {
            try {
              await markReminderSent(uid, client, actor);
              toast.success("Reminder logged & next date scheduled");
            } catch {
              toast.error("Failed to log reminder");
            }
          }}
        >
          Log reminder sent
        </Button>
      </div>
    </div>
  );
}
