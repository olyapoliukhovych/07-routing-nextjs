'use client';

import Image from 'next/image';
import css from './Modal.module.css';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  showBackButton?: boolean;
};

const Modal = ({ children, onClose, showBackButton = false }: Props) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        {children}
        {showBackButton && (
          <button className={css.goBackBtn} onClick={onClose}>
            <Image src="/circle-left.svg" alt="close" width={20} height={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
