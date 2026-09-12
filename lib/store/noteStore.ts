import { Note, Tag } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialDraft = {
  title: "",
  content: "",
  tag: "Todo" as Tag,
};

interface NoteStore {
  draft: Pick<Note, "content" | "title" | "tag">;
  setDraft: (note: Pick<Note, "content" | "title" | "tag">) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note: Pick<Note, "content" | "title" | "tag">) =>
        set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    { name: "note-draft", partialize: (state) => ({ draft: state.draft }) },
  ),
);

export const selectGetDraft = (state: NoteStore) => state.draft;
export const selectClearDraft = (state: NoteStore) => state.clearDraft;
export const selectSetDraft = (state: NoteStore) => state.setDraft;
