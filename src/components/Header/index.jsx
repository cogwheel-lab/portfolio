import { githubUrls } from "@/config/githubUrl";
import Link from "next/link";
import styles from "./Header.module.scss";

export const Header = ({ pageKey }) => {
  const pageInfo = githubUrls[pageKey] || githubUrls.top;

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link
          href="./"
          className={styles.logo}
        >
          cogwheel-lab
        </Link>
        <Link
          href={pageInfo.url}
          target="_blank"
          rel="noopener"
          className={styles.headerLink}
        >
          {pageInfo.label}
        </Link>
      </div>
    </header>
  );
};
