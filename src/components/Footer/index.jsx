import { works } from "@/lib/works";
import Link from "next/link";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        {" "}
        <a
          href="https://www.buymeacoffee.com/cogwheellab"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=cogwheellab&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
            alt="Buy me a coffee"
          />
        </a>
      </div>
      <div>
        <ul className={styles.footerLink}>
          {works.map((work, index) => (
            <li key={work.href}>
              <Link
                key={index}
                className={styles.workCard}
                href={work.href}
              >
                {work.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.footerText}>
        © 2025 - {new Date().getFullYear()} cogwheel-lab
      </p>
    </footer>
  );
};
