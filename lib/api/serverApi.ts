import { Note } from "@/types/note";
import { nextApi } from "./api";
import { cookies } from "next/headers";
import { FetchNoteById, FetchNotesData, FetchNotesProps } from "./clientApi";
import { User } from "@/types/user";

export async function fetchNotes({
  search,
  page,
  perPage,
  tag,
}: FetchNotesProps): Promise<FetchNotesData> {
  const cookieStore = await cookies();
  const { data } = await nextApi.get<FetchNotesData>("/notes", {
    params: {
      search: search,
      page: page,
      perPage: perPage,
      tag: tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function fetchNoteById({ id }: FetchNoteById): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await nextApi.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export interface checkSessionData {
  message: string;
}
export async function checkSession() {
  const cookieStore = await cookies();
  const data = await nextApi.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextApi.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
