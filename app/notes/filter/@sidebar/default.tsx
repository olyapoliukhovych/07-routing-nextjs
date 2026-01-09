import { getTags } from '@/lib/api';
import Link from 'next/link';
import css from '@/app/notes/filter/@sidebar/SidebarNotes.module.css';

const SidebarNotes = async () => {
  const tags = await getTags();

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map(tag => (
        <li key={tag.id} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
