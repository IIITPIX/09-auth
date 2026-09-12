import Link from "next/link";
import css from "./SidebarNotes.module.css";
export default function SideBar() {
  const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <>
      <ul className={css.menuList}>
        {/* список тегів */}
        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>
        {tags &&
          tags.map((tag) => (
            <li className={css.menuItem} key={tag}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
