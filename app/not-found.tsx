'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import css from '@/app/NotFound.module.css';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className={css.link}>
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
