import css from '@/components/Footer/Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Olya Poliukhovych</p>
          <p>
            Contact me:
            <span className={css.emailSpan}>
              <Link href="mailto:olha.poliukhovych.1@gmail.com">olha.poliukhovych.1@gmail.com</Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
