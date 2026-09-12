import { JSX } from "react/jsx-runtime";
import css from "./LayoutNotes.module.css";
interface LayoutNotesProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function LayoutNotes({ sidebar, children }: LayoutNotesProps) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
