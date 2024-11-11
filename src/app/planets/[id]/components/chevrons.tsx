import { ReactNode, SVGProps } from "react";
import styles from "./chevrons.module.css";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}

interface ButtonIconPros extends SVGProps<SVGSVGElement> {
  onClick: ButtonProps["onClick"];
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={styles.chev}>
      {children}
    </button>
  );
}

export function ChevronLeft({ onClick, ...props }: ButtonIconPros) {
  return (
    <Button onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="5em"
        height="5em"
        {...props}
      >
        <path
          d="M12 17a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 1 1 1.414 1.414L9.414 12l3.293 3.293A1 1 0 0 1 12 17Z"
          fill="#53b9ab"
        />
        <path
          d="M16 17a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 1 1 1.414 1.414L13.414 12l3.293 3.293A1 1 0 0 1 16 17Z"
          fill="#53b9ab"
        />
      </svg>
    </Button>
  );
}

export function ChevronRight({ onClick, ...props }: ButtonIconPros) {
  return (
    <Button onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="5em"
        height="5em"
        {...props}
      >
        <path
          d="M12 17a1 1 0 0 1-.707-1.707L14.586 12l-3.293-3.293a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4A1 1 0 0 1 12 17Z"
          fill="#53b9ab"
        />
        <path
          d="M8 17a1 1 0 0 1-.707-1.707L10.586 12 7.293 8.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4A1 1 0 0 1 8 17Z"
          fill="#53b9ab"
        />
      </svg>
    </Button>
  );
}
