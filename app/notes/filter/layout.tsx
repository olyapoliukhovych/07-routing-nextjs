import css from '@/app/notes/filter/LayoutNotes.module.css';

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <section className={css.notesWrapper}>{children}</section>
    </div>
  );
};

export default NotesLayout;
