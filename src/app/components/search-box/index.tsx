import { ChangeEvent, FormEvent } from "react";
import styles from "./search-box.module.css";
import SearchIcon from "./search-icon";

export interface SearchBoxProps {
  onChange: (value: string) => void;
  onSubmit: (value: FormDataEntryValue | null) => void;
}

export default function SearchBox({ onChange, onSubmit }: SearchBoxProps) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange(e.target.value);
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    onSubmit(formData.get("search-planet"));
  };

  return (
    <form className={styles.form} onSubmit={handleOnSubmit}>
      <fieldset className={styles.flexContainer}>
        <input
          className={styles.input}
          type="search"
          placeholder="search planet"
          id="search-planet"
          name="search-planet"
          title="type to search a planet"
          aria-label="type to search a planet"
          onChange={handleOnChange}
        />
        <button type="submit" className={styles.submitBtn}>
          <SearchIcon />
        </button>
      </fieldset>
    </form>
  );
}
