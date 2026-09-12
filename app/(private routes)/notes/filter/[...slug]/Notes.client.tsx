"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./App.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import { fetchNotes } from "@/lib/api/clientApi";

interface NotesClientProps {
  tag?: string;
}
export default function NotesClient({ tag }: NotesClientProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["notes", currentPage, searchText, tag],
    queryFn: () =>
      fetchNotes({
        search: searchText,
        page: currentPage,
        perPage: 12,
        tag: tag,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearchText = useDebouncedCallback((text: string) => {
    setSearchText(text);
    setCurrentPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchText} />
        {data && (
          <Pagination
            currentPage={currentPage}
            totalPage={data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => router.push("/notes/action/create")}
        >
          Create note +
        </button>
      </header>
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
