import CreateNote from "@/components/CreateNote/CreateNote";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "NoteHub application create Page",
  description: "Page for creating notes",
  openGraph: {
    title: "NoteHub application create Page",
    description: "Page for creating notes",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Open Graph image for NoteHub application",
        width: 300,
        height: 300,
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
