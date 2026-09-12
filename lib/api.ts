import axios from "axios";
import type { Note } from "../types/note";

const apiKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["accept"] = "application/json";
axios.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;

interface FetchNotesProps {
  search: string;
  page: number;
  perPage: number;
  tag?: string;
}

interface FetchNotesData {
  notes: Note[];
  totalPages: number;
}
export async function fetchNotes({
  search,
  page,
  perPage,
  tag,
}: FetchNotesProps): Promise<FetchNotesData> {
  const { data } = await axios.get<FetchNotesData>("/notes", {
    params: {
      search: search,
      page: page,
      perPage: perPage,
      tag: tag,
    },
  });
  return data;
}

export async function fetchDeleteNote(id: string): Promise<Note> {
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
}

interface addNotesProps {
  title: string;
  content: string;
  tag: string;
}
export async function addNotes({
  title,
  content,
  tag,
}: addNotesProps): Promise<Note> {
  const { data } = await axios.post<Note>("/notes", {
    title: title,
    content: content,
    tag: tag,
  });
  return data;
}

interface FetchNoteById {
  id: string;
}

export async function fetchNoteById({ id }: FetchNoteById): Promise<Note> {
  const { data } = await axios.get<Note>(`/notes/${id}`);
  return data;
}
