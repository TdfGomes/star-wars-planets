"use client";

import { useDebounce, useInfinitePlanets, useSearch } from "./hooks";
import SearchBox from "./components/search-box";
import CardsList from "./components/cards/card-list";
import Card from "./components/cards/card";
import styles from "./page.module.css";
import { getHref } from "./helpers";

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
        {planets?.map(({ name, population, url }) => (
          <Card key={name} title={name} ref={ref} href={getHref(url)}>
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
