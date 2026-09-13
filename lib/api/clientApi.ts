import { User } from "@/types/user";
import type { Note } from "../../types/note";
import { nextApi } from "./api";

const apiKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface FetchNotesData {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesProps {
  search: string;
  page: number;
  perPage: number;
  tag?: string;
}

export async function fetchNotes({
  search,
  page,
  perPage,
  tag,
}: FetchNotesProps): Promise<FetchNotesData> {
  const { data } = await nextApi.get<FetchNotesData>("/notes", {
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
  const { data } = await nextApi.delete<Note>(`/notes/${id}`);
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
  const { data } = await nextApi.post<Note>("/notes", {
    title: title,
    content: content,
    tag: tag,
  });
  return data;
}

export interface FetchNoteById {
  id: string;
}

export async function fetchNoteById({ id }: FetchNoteById): Promise<Note> {
  const { data } = await nextApi.get<Note>(`/notes/${id}`);
  return data;
}

interface RegisterProps {
  email: string;
  password: string;
}
export async function register({
  email,
  password,
}: RegisterProps): Promise<User> {
  const { data } = await nextApi.post<User>("auth/register", {
    email: email,
    password: password,
  });
  return data;
}

interface LoginProps {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginProps): Promise<User> {
  const { data } = await nextApi.post<User>("/auth/login", {
    email: email,
    password: password,
  });
  return data;
}

export interface checkSessionData {
  message: string;
}
export async function checkSession(): Promise<checkSessionData> {
  const { data } = await nextApi.get<checkSessionData>("/auth/session");
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await nextApi.get<User>("/users/me");
  return data;
}

export async function logout() {
  await nextApi.post("/auth/logout");
}

interface UpdateMeProps {
  email?: string;
  username: string;
}
export async function updateMe({
  email,
  username,
}: UpdateMeProps): Promise<User> {
  const { data } = await nextApi.patch<User>("/users/me", {
    email: email,
    username: username,
  });
  return data;
}
