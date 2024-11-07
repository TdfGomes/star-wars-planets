import { ReactNode } from "react";
import styles from "./cards.module.css";

export default function CardsList({ children }: Readonly<{ children: ReactNode }>) {
  return <ul className={styles.list}>{children}</ul>;
}
