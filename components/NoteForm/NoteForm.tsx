import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNotes } from "../../lib/api";
import {
  selectClearDraft,
  selectGetDraft,
  selectSetDraft,
  useNoteStore,
} from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const draft = useNoteStore(selectGetDraft);
  const setNote = useNoteStore(selectSetDraft);
  const clearNote = useNoteStore(selectClearDraft);

  const mutation = useMutation({
    mutationFn: addNotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearNote();
      router.push("/notes/filter/all");
    },
  });
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(draft);
  };

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setNote({
      ...draft,
      [e.currentTarget.name]: e.target.value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            className={css.input}
            value={draft.title}
            onChange={handleOnChange}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            value={draft.content}
            onChange={handleOnChange}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select
            id="tag"
            name="tag"
            className={css.select}
            value={draft.tag}
            onChange={handleOnChange}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </div>
    </form>
  );
}
