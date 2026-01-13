import css from '@/app/notes/filter/LayoutNotes.module.css';

const NotesLayout = ({
  children,
  modal,
  sidebar,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
  sidebar?: React.ReactNode;
}) => {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.notesWrapper}>
        {children}
        {modal}
      </main>
    </div>
  );
};

export default NotesLayout;
