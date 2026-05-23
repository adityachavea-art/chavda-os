"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import AppShell from "@/components/AppShell";
import AnimatedPage from "@/components/AnimatedPage";
import PageLoader from "@/components/ui/PageLoader";
import PageHeader from "@/components/ui/PageHeader";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import EmptyState from "@/components/ui/EmptyState";
import { useWorkspace } from "@/hooks/useWorkspace";
import { createNote, updateNote, deleteNote } from "@/lib/services/notes";
import type { Note } from "@/lib/types";
import { BRAND } from "@/lib/branding";

export default function NotesPage() {
  const { workspaceId, actor, notes, loading } = useWorkspace();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Note | undefined>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    );
  }, [notes, search]);

  const openNew = () => {
    setEditing(undefined);
    setTitle("");
    setContent("");
    setModalOpen(true);
  };

  const openEdit = (note: Note) => {
    setEditing(note);
    setTitle(note.title);
    setContent(note.content);
    setModalOpen(true);
  };

  const save = async () => {
    if (!workspaceId || !title.trim()) return;
    setSaving(true);
    try {
      const data = { title: title.trim(), content: content.trim() };
      if (editing) {
        await updateNote(workspaceId, editing.id, data);
        toast.success("Note updated");
      } else {
        await createNote(workspaceId, data);
        toast.success("Note created");
      }
      setModalOpen(false);
    } catch {
      toast.error("Failed to save note");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (note: Note) => {
    if (!workspaceId || !confirm(`Delete "${note.title}"?`)) return;
    try {
      await deleteNote(workspaceId, note.id);
      toast.success("Note deleted");
    } catch {
      toast.error("Failed to delete");
    }
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
        title="Notes"
        subtitle={`${BRAND.foundedBy} · Quick workspace notes stored in Firestore.`}
        actions={
          <>
            <div className="flex h-12 w-full items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#111318] px-4 sm:w-64">
              <Search className="h-5 w-5 text-zinc-500" />
              <input
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <Button onClick={openNew}>
              <Plus className="h-4 w-4" />
              New Note
            </Button>
          </>
        }
      />

      {filtered.length === 0 ? (
        <EmptyState
          title={search ? "No matches" : "No notes yet"}
          description="Create notes for meetings, GST filings, or client follow-ups."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((note) => (
            <article
              key={note.id}
              className="glass-card flex flex-col rounded-3xl p-5"
            >
              <h3 className="text-lg font-bold">{note.title}</h3>
              <p className="mt-3 flex-1 whitespace-pre-wrap text-sm leading-relaxed text-zinc-400 line-clamp-6">
                {note.content || "—"}
              </p>
              <p className="mt-4 text-xs text-zinc-600">
                {new Date(note.updatedAt).toLocaleString("en-IN")}
              </p>
              <div className="mt-4 flex gap-2">
                <Button variant="secondary" className="flex-1 py-2" onClick={() => openEdit(note)}>
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
                <Button variant="danger" className="py-2" onClick={() => remove(note)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        title={editing ? "Edit note" : "New note"}
        onClose={() => setModalOpen(false)}
      >
        <div className="space-y-4">
          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea label="Content" value={content} onChange={(e) => setContent(e.target.value)} />
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
