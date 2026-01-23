import { useCallback, useState } from "react";
import { Headline } from "src/components/Headline";
import { Links } from "src/components/Links";
import styles from "src/components/Main/Main.module.scss";

const ITEMS = [
  {
    href: "https://dammy01",
    title: "Documentation →",
    description:
      "ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト",
  },
  {
    href: "https://dammy02",
    title: "Learn →",
    description:
      "ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト",
  },
  {
    href: "https://dammy03",
    title: "Examples →",
    description:
      "ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト",
  },
  {
    href: "https://dammy04",
    title: "Deploy →",
    description:
      "ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト",
  },
];

export const Main = (props) => {
  const [items, setItems] = useState(ITEMS);
  const handleReduce = useCallback(() => {
    setItems((prevItems) => {
      return prevItems.slice(0, prevItems.length - 1);
    });
  }, []);
  return (
    <main className={styles.main}>
      <Headline
        page={props.page}
        handleReduce={handleReduce}
      >
        <code className={styles.code}>{items.length}</code>
      </Headline>

      <Links
        items={items}
        handleReduce={handleReduce}
      />
    </main>
  );
};
