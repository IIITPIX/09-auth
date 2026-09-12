import { Metadata } from "next";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "not found page for creating notes application",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description: "not found page for creating notes application",
    url: "https://notehub.com/",
    images: {
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      alt: "image for Notehub aplication link",
      width: 300,
      height: 300,
    },
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
