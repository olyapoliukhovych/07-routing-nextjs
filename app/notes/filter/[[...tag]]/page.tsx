import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from '../../Notes.client';

type Props = {
  params: Promise<{ tag?: string[] }>;
};

export default async function FilteredNotesPage({ params }: Props) {
  const resolvedParams = await params;

  const tagFromUrl = resolvedParams.tag?.[0];
  const activeTag = tagFromUrl === 'all' ? undefined : tagFromUrl;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', activeTag],
    queryFn: () => fetchNotes(1, '', activeTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
