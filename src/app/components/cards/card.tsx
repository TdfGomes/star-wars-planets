import { ReactNode } from "react";
import styles from "./cards.module.css";
import Link from "next/link";

export interface CardProps {
  title: string;
  children: ReactNode;
}

export default function Card({ title, children }: CardProps) {
  const href = encodeURI(`/planets/${title}`);
  return (
    <li className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
      <Link href={href} className={styles.btn}>
        More Details
      </Link>
    </li>
  );
}
