"use client";

import { useState } from "react";
import { Plus, Clock3, CircleDashed, CheckCircle2, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import AppShell from "@/components/AppShell";
import AnimatedPage from "@/components/AnimatedPage";
import PageLoader from "@/components/ui/PageLoader";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { useWorkspace } from "@/hooks/useWorkspace";
import { createTask, updateTask, deleteTask } from "@/lib/services/tasks";
import type { Task, TaskPriority, TaskStatus } from "@/lib/types";
import { formatDateInput, clsx } from "@/lib/utils";
import { BRAND } from "@/lib/branding";

const columns: { status: TaskStatus; title: string; icon: typeof CircleDashed; color: string }[] = [
  { status: "todo", title: "To Do", icon: CircleDashed, color: "text-zinc-400" },
  { status: "in_progress", title: "In Progress", icon: Clock3, color: "text-orange-400" },
  { status: "done", title: "Done", icon: CheckCircle2, color: "text-emerald-400" },
];

const priorityColors: Record<TaskPriority, string> = {
  high: "bg-red-500/10 text-red-300",
  medium: "bg-orange-500/10 text-orange-300",
  low: "bg-blue-500/10 text-blue-300",
};

export default function TasksPage() {
  const { workspaceId, tasks, stats, loading } = useWorkspace();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | undefined>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState(formatDateInput());
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setEditing(undefined);
    setTitle("");
    setDescription("");
    setStatus("todo");
    setPriority("medium");
    setDueDate(formatDateInput());
    setModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditing(task);
    setTitle(task.title);
    setDescription(task.description ?? "");
    setStatus(task.status);
    setPriority(task.priority);
    setDueDate(task.dueDate);
    setModalOpen(true);
  };

  const save = async () => {
    if (!workspaceId || !title.trim()) return;
    setSaving(true);
    try {
      const data = {
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        priority,
        dueDate,
      };
      if (editing) {
        await updateTask(workspaceId, editing.id, data);
        toast.success("Task updated");
      } else {
        await createTask(workspaceId, data);
        toast.success("Task created");
      }
      setModalOpen(false);
    } catch {
      toast.error("Failed to save task");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (task: Task) => {
    if (!workspaceId || !confirm(`Delete "${task.title}"?`)) return;
    try {
      await deleteTask(workspaceId, task.id);
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const moveStatus = async (task: Task, newStatus: TaskStatus) => {
    if (!workspaceId) return;
    await updateTask(workspaceId, task.id, { status: newStatus });
  };

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
        title="Tasks"
        subtitle={`${BRAND.foundedBy} · Productivity board synced to Firestore.`}
        actions={
          <Button onClick={openNew}>
            <Plus className="h-4 w-4" />
            Create Task
          </Button>
        }
      />

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total" value={stats.totalTasks} icon={CircleDashed} />
        <StatCard
          label="In progress"
          value={tasks.filter((t) => t.status === "in_progress").length}
          icon={Clock3}
          accent="text-orange-400"
        />
        <StatCard
          label="Completed"
          value={stats.completedTasks}
          icon={CheckCircle2}
          accent="text-emerald-400"
        />
        <StatCard
          label="Open"
          value={stats.pendingTasks}
          icon={CircleDashed}
          accent="text-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {columns.map((col) => {
          const Icon = col.icon;
          const colTasks = tasks.filter((t) => t.status === col.status);
          return (
            <div key={col.status} className="glass-card rounded-3xl p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={clsx("h-5 w-5", col.color)} />
                  <h2 className="font-bold">{col.title}</h2>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400">
                  {colTasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    className="rounded-2xl border border-white/5 bg-white/[0.03] p-4"
                  >
                    <h3 className="font-medium">{task.title}</h3>
                    {task.description && (
                      <p className="mt-2 text-sm text-zinc-500 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={clsx(
                          "rounded-full px-3 py-1 text-xs capitalize",
                          priorityColors[task.priority]
                        )}
                      >
                        {task.priority}
                      </span>
                      <span className="text-xs text-zinc-500">{task.dueDate}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {col.status !== "todo" && (
                        <button
                          type="button"
                          className="text-xs text-zinc-500 hover:text-white"
                          onClick={() =>
                            moveStatus(
                              task,
                              col.status === "done" ? "in_progress" : "todo"
                            )
                          }
                        >
                          ← Back
                        </button>
                      )}
                      {col.status !== "done" && (
                        <button
                          type="button"
                          className="text-xs text-blue-400 hover:text-blue-300"
                          onClick={() =>
                            moveStatus(
                              task,
                              col.status === "todo" ? "in_progress" : "done"
                            )
                          }
                        >
                          Advance →
                        </button>
                      )}
                      <button
                        type="button"
                        className="ml-auto text-zinc-500 hover:text-white"
                        onClick={() => openEdit(task)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        className="text-zinc-500 hover:text-red-400"
                        onClick={() => remove(task)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        open={modalOpen}
        title={editing ? "Edit task" : "New task"}
        onClose={() => setModalOpen(false)}
      >
        <div className="space-y-4">
          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </Select>
            <Select label="Priority" value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </div>
          <Input label="Due date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <div className="flex gap-3">
            <Button onClick={save} disabled={saving} className="flex-1">
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      </AnimatedPage>
    </AppShell>
  );
}
