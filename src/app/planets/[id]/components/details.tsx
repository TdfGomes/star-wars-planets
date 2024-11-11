import Image, { StaticImageData } from "next/image";
import styles from "./styles.module.css";
import { capitalize } from "./helpers";

type Icons = { [K in keyof DetailsProps["details"]]: StaticImageData };
interface DetailsProps {
  title: string;
  details: Record<string, string>;
  icons: Icons;
  onClick: () => void;
  titleId?: string;
  descriptionId?: string;
}

export default function Details({
  title,
  details,
  onClick,
  icons,
  titleId,
  descriptionId,
}: DetailsProps) {
  const handleOnClick = () => {
    onClick();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title} id={titleId}>
        {title}
      </h1>
      <ul aria-label="details list" className={styles.list} id={descriptionId}>
        {Object.entries(details).map(([propName, propValue], idx) => (
          <li aria-label={propName} className={styles.item} key={idx}>
            <Image
              src={icons[propName]}
              alt={`${propName} icon`}
              aria-hidden="true"
              className={styles.img}
            />
            <b>{capitalize(propName)}: </b>
            {propValue}
          </li>
        ))}
      </ul>
      <button className={styles.btn} onClick={handleOnClick}>
        <span>Go Back</span>
      </button>
    </div>
  );
}
