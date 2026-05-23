"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { subscribeClients } from "@/lib/services/clients";
import { subscribeTasks } from "@/lib/services/tasks";
import { subscribeNotes } from "@/lib/services/notes";
import { subscribePayments } from "@/lib/services/payments";
import { subscribeCompliance } from "@/lib/services/compliance";
import { subscribeInvoices } from "@/lib/services/invoices";
import { subscribeDocuments } from "@/lib/services/documents";
import { subscribeNotifications } from "@/lib/services/notifications";
import { subscribeActivity } from "@/lib/services/activity-read";
import { syncSystemNotifications } from "@/lib/services/notifications";
import { computeDashboardStats } from "@/lib/stats";
import type {
  ActivityLog,
  AppNotification,
  Client,
  ComplianceRecord,
  DocumentFile,
  Invoice,
  Note,
  Payment,
  Task,
} from "@/lib/types";
import { useFirestoreStatus } from "@/contexts/FirestoreContext";

type LoadKey =
  | "clients"
  | "tasks"
  | "notes"
  | "payments"
  | "compliance"
  | "invoices"
  | "documents"
  | "notifications"
  | "activity";

function onFirestoreError(
  code: string,
  setPermissionError: (v: boolean) => void
) {
  if (code === "permission-denied") setPermissionError(true);
}

export function useWorkspaceData(workspaceId: string | null) {
  const { setPermissionError } = useFirestoreStatus();
  const [clients, setClients] = useState<Client[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [compliance, setCompliance] = useState<ComplianceRecord[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [loaded, setLoaded] = useState<Record<LoadKey, boolean>>({
    clients: false,
    tasks: false,
    notes: false,
    payments: false,
    compliance: false,
    invoices: false,
    documents: false,
    notifications: false,
    activity: false,
  });
  const [usingApiFallback, setUsingApiFallback] = useState(false);
  const syncedNotifs = useRef(false);

  const markLoaded = (key: LoadKey) =>
    setLoaded((prev) => ({ ...prev, [key]: true }));

  const loading =
    Boolean(workspaceId) && !Object.values(loaded).every(Boolean);

  const fetchViaApi = useCallback(async () => {
    if (!workspaceId) return false;
    try {
      const { auth } = await import("@/lib/firebase");
      const u = auth.currentUser;
      if (!u) return false;
      const token = await u.getIdToken();
      const res = await fetch("/api/workspace", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return false;
      const data = await res.json();
      setClients(data.clients ?? []);
      setTasks(data.tasks ?? []);
      setNotes(data.notes ?? []);
      setPayments(data.payments ?? []);
      setCompliance(data.compliance ?? []);
      setInvoices(data.invoices ?? []);
      setDocuments(data.documents ?? []);
      setLoaded({
        clients: true,
        tasks: true,
        notes: true,
        payments: true,
        compliance: true,
        invoices: true,
        documents: true,
        notifications: true,
        activity: true,
      });
      setUsingApiFallback(true);
      return true;
    } catch {
      return false;
    }
  }, [workspaceId]);

  useEffect(() => {
    if (!workspaceId) {
      setClients([]);
      setTasks([]);
      setNotes([]);
      setPayments([]);
      setCompliance([]);
      setInvoices([]);
      setDocuments([]);
      setNotifications([]);
      setActivity([]);
      setLoaded({
        clients: false,
        tasks: false,
        notes: false,
        payments: false,
        compliance: false,
        invoices: false,
        documents: false,
        notifications: false,
        activity: false,
      });
      syncedNotifs.current = false;
      return;
    }

    let unsubs: (() => void)[] = [];
    let cancelled = false;

    const start = async () => {
      setPermissionError(false);
      setUsingApiFallback(false);
      syncedNotifs.current = false;
      setLoaded({
        clients: false,
        tasks: false,
        notes: false,
        payments: false,
        compliance: false,
        invoices: false,
        documents: false,
        notifications: false,
        activity: false,
      });

      const err = (code: string) => onFirestoreError(code, setPermissionError);

      unsubs = [
        subscribeClients(workspaceId, setClients, {
          onError: err,
          onReady: () => markLoaded("clients"),
        }),
        subscribeTasks(workspaceId, setTasks, {
          onError: err,
          onReady: () => markLoaded("tasks"),
        }),
        subscribeNotes(workspaceId, setNotes, {
          onError: err,
          onReady: () => markLoaded("notes"),
        }),
        subscribePayments(workspaceId, setPayments, {
          onError: err,
          onReady: () => markLoaded("payments"),
        }),
        subscribeCompliance(workspaceId, setCompliance, {
          onError: err,
          onReady: () => markLoaded("compliance"),
        }),
        subscribeInvoices(workspaceId, setInvoices, {
          onError: err,
          onReady: () => markLoaded("invoices"),
        }),
        subscribeDocuments(workspaceId, setDocuments, {
          onError: err,
          onReady: () => markLoaded("documents"),
        }),
        subscribeNotifications(workspaceId, setNotifications, {
          onError: err,
          onReady: () => markLoaded("notifications"),
        }),
        subscribeActivity(workspaceId, setActivity, {
          onError: err,
          onReady: () => markLoaded("activity"),
        }),
      ];
    };

    start();
    return () => {
      cancelled = true;
      unsubs.forEach((u) => u());
    };
  }, [workspaceId, setPermissionError]);

  useEffect(() => {
    if (!workspaceId || loading || syncedNotifs.current) return;
    syncedNotifs.current = true;
    void syncSystemNotifications(workspaceId, { compliance, invoices, clients });
  }, [workspaceId, loading, compliance, invoices, clients]);

  const stats = useMemo(
    () =>
      computeDashboardStats(
        clients,
        tasks,
        notes,
        payments,
        compliance,
        invoices,
        documents
      ),
    [clients, tasks, notes, payments, compliance, invoices, documents]
  );

  return {
    clients,
    tasks,
    notes,
    payments,
    compliance,
    invoices,
    documents,
    notifications,
    activity,
    stats,
    loading,
    usingApiFallback,
  };
}
