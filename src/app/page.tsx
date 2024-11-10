"use client";

import { useDebounce, useInfinitePlanets, useSearch } from "./hooks";
import SearchBox from "./components/search-box";
import CardsList from "./components/cards/card-list";
import Card from "./components/cards/card";
import styles from "./page.module.css";

export default function Planets() {
  const { getSearch } = useSearch();
  const query = useDebounce(getSearch());
  const { data: planets, isLoading, ref } = useInfinitePlanets(query);

  return (
    <>
      <SearchBox />
      {!isLoading && !planets?.length && (
        <h2 className={styles.noResults}>No planet found for: {query}</h2>
      )}
      <CardsList>
        {planets?.map(({ name, population }) => (
          <Card key={name} title={name} ref={ref}>
            <p>
              <b>Population:</b>
              {population}
            </p>
          </Card>
        ))}
      </CardsList>
    </>
  );
}
