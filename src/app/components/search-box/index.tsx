import { ChangeEvent } from "react";
import styles from "./search-box.module.css";
import SearchIcon from "./search-icon";
import { useSearch } from "@/app/hooks";

export default function SearchBox() {
  const { setSearch, getSearch } = useSearch();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearch(e.target.value);
  };

  return (
    <form className={styles.form}>
      <fieldset className={styles.flexContainer}>
        <input
          defaultValue={getSearch() || ""}
          className={styles.input}
          type="search"
          placeholder="search planet"
          id="search"
          name="search"
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
