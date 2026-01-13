import type { Note } from '@/types/note';
import css from '@/components/NoteList/NoteList.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li
          key={id}
          className={css.listItem}
          onClick={() => {
            router.push(`/notes/${id}`, { scroll: false });
          }}
          style={{ cursor: 'pointer' }}
        >
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button
              onClick={e => {
                e.stopPropagation();
                mutate(id);
              }}
              className={css.button}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
