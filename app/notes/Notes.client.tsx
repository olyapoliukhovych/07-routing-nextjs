// 'use client';

// import { useState } from 'react';
// import { useQuery, keepPreviousData } from '@tanstack/react-query';
// import { useDebounce } from 'use-debounce';
// import { fetchNotes } from '@/lib/api';
// import NoteList from '@/components/NoteList/NoteList';
// import SearchBox from '@/components/SearchBox/SearchBox';
// import Pagination from '@/components/Pagination/Pagination';
// import Modal from '@/components/Modal/Modal';
// import NoteForm from '@/components/NoteForm/NoteForm';
// import css from '@/app/notes/NotesPage.module.css';

// export default function NotesClient() {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState('');
//   const [debouncedSearch] = useDebounce(search, 500);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { data, isLoading } = useQuery({
//     queryKey: ['notes', page, debouncedSearch],
//     queryFn: () => fetchNotes(page, debouncedSearch),
//     placeholderData: keepPreviousData,
//   });

//   const handleSearchChange = (value: string) => {
//     setSearch(value);
//     setPage(1);
//   };

//   return (
//     <div className={css.container}>
//       <header className={css.toolbar}>
//         <SearchBox value={search} onChange={handleSearchChange} />
//         {data && data.totalPages > 1 && (
//           <Pagination pageCount={data.totalPages} currentPage={page} onPageChange={setPage} />
//         )}
//         <button className={css.button} onClick={() => setIsModalOpen(true)}>
//           Create note +
//         </button>
//       </header>

//       {data?.notes.length ? (
//         <NoteList notes={data.notes} />
//       ) : (
//         !isLoading && <p className="noNotesMsg">No notes found.</p>
//       )}

//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <NoteForm onClose={() => setIsModalOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import css from '@/app/notes/NotesPage.module.css';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function NotesClient() {
  const params = useParams();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const rawTag = Array.isArray(params.tag) ? params.tag[0] : params.tag;
  const activeTag = rawTag === 'all' ? undefined : rawTag;

  const { data, isLoading } = useQuery({
    queryKey: ['notes', page, debouncedSearch, activeTag],
    queryFn: () => fetchNotes(page, debouncedSearch, activeTag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination pageCount={data.totalPages} currentPage={page} onPageChange={setPage} />
        )}
        <button className={css.button} onClick={() => setIsCreateOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading ? (
        <p className={css.loading}>Loading notes...</p>
      ) : data?.notes.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p className={css.noNotesMsg}>No notes found.</p>
      )}

      {isCreateOpen && (
        <Modal onClose={() => setIsCreateOpen(false)} showBackButton={false}>
          <NoteForm onClose={() => setIsCreateOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
