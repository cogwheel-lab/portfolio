import Link from "next/link";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link
          href="https://github.com/cogwheel-lab/portfolio"
          target="_blank"
          rel="noopener"
          className={styles.headerLink}
        >
          GitHub
        </Link>
      </div>
    </header>
  );
};
