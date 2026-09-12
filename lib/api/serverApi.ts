import {
  FetchNoteById,
  FetchNotesData,
  FetchNotesProps,
  Note,
} from "@/types/note";
import { nextApi } from "./api";
import { cookies } from "next/headers";

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
