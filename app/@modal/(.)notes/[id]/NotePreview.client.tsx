"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";

export default function NotePreviewClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById({ id }),
    refetchOnMount: false,
  });

  return (
    <Modal
      onClose={() => {
        router.back();
      }}
    >
      <button onClick={() => router.back()}>Back</button>
      {data && (
        <main className={css.main}>
          <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{data.title}</h2>
              </div>
              <p className={css.tag}>{data.tag}</p>
              <p className={css.content}>{data.content}</p>
              <p className={css.date}>{data.createdAt}</p>
            </div>
          </div>
        </main>
      )}
      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Something went wrong.</p>}
    </Modal>
  );
}
