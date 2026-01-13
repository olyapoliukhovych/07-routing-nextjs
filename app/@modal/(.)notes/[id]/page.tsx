import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from '@/app/@modal/(.)notes/[id]/NotePreview.client';
import css from '@/app/@modal/(.)notes/[id]/NotePreview.module.css';

export default async function NoteInterceptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <NotePreviewClient>
      <div className={css.container}>
        {/* <button className={css.backBtn}>back</button> */}
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
    </NotePreviewClient>
  );
}
