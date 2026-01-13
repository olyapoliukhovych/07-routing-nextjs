'use client';
import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';

function NotePreviewClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()} showBackButton={true}>
      {children}
    </Modal>
  );
}

export default NotePreviewClient;
