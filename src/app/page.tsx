"use client";

import { useGetPlanets } from "./hooks";
import SearchBox from "./components/search-box";
import CardsList from "./components/cards/card-list";
import Card from "./components/cards/card";

export default function Planets() {
  const { data: planets } = useGetPlanets();
  const handleOnChange = (value: string) => {
    console.log(value);
  };
  const handleOnSubmit = (value: FormDataEntryValue | null) => {
    console.log(value);
  };
  return (
    <>
      <SearchBox onChange={handleOnChange} onSubmit={handleOnSubmit} />
      <CardsList>
        {planets?.results?.map(({ name, population }) => (
          <Card key={name} title={name}>
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
