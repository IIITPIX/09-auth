import { fetchNoteById, fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

interface GenerateMetadataProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Notes filtered by category ${slug[0]}`,
    description: `Page where filtred notes by category`,
    openGraph: {
      title: `Notes filtered by category ${slug[0]}`,
      description: `Page where filtered notes by category`,
      url: `https://notehub.com/notes/filter/${slug[0]}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          alt: "image for Notehub application link",
          width: 300,
          height: 300,
        },
      ],
    },
  };
}

export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  const filterParams = slug[0] !== "all" ? slug[0] : undefined;
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", filterParams],
    queryFn: () =>
      fetchNotes({ search: "", page: 1, perPage: 12, tag: filterParams }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={filterParams} />
    </HydrationBoundary>
  );
}
