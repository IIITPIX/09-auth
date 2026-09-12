export type Tag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: Tag;
}

/// for requests
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

export interface FetchNoteById {
  id: string;
}
