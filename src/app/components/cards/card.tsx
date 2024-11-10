import { ForwardedRef, forwardRef, ReactNode } from "react";
import styles from "./cards.module.css";
import Link from "next/link";

export interface CardProps {
  title: string;
  children: ReactNode;
}

export function Card({ title, children }: CardProps, ref: ForwardedRef<HTMLLIElement>) {
  const href = encodeURI(`/planets/${title}`);
  return (
    <li className={styles.card} ref={ref}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
      <Link href={href} className={styles.btn}>
        More Details
      </Link>
    </li>
  );
}
const CardRef = forwardRef(Card);

CardRef.displayName = "Card";

export default CardRef;