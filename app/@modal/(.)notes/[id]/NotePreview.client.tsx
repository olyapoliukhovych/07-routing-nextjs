'use client';

import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import css from './NotePreview.module.css';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data: note } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (!note) return null;

  return (
    <Modal onClose={() => router.back()} showBackButton={true}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>

          <div className={css.content}>{note.content}</div>

          <div className={css.bottomContent}>
            <span className={css.tag}>{note.tag}</span>
            <div className={css.date}>Created: {new Date(note.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default NotePreviewClient;
