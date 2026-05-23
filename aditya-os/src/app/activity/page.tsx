"use client";

import AppShell from "@/components/AppShell";
import AnimatedPage from "@/components/AnimatedPage";
import PageLoader from "@/components/ui/PageLoader";
import PageHeader from "@/components/ui/PageHeader";
import ActivityTimeline from "@/components/ActivityTimeline";
import { useWorkspace } from "@/hooks/useWorkspace";
import { BRAND } from "@/lib/branding";

export default function ActivityPage() {
  const { activity, loading } = useWorkspace();

  if (loading) {
    return (
      <AppShell>
        <PageLoader />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <AnimatedPage>
        <PageHeader
          badge={BRAND.appName}
          title="Activity log"
          subtitle={`${BRAND.foundedBy} · Every action tracked with timestamp`}
        />
        <div className="glass-card rounded-3xl p-6">
          <ActivityTimeline logs={activity} limit={100} />
        </div>
      </AnimatedPage>
    </AppShell>
  );
}
