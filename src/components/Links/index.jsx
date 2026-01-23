import styles from "src/components/Links/Links.module.scss";

export const Links = (props) => {
  return (
    <div className={styles.grid}>
      {props.items.map((item) => {
        return (
          <a
            key={item.href}
            href={item.href}
            className={styles.href}
          >
            <h3 className={styles.title}>🔸{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
          </a>
        );
      })}
    </div>
  );
};
