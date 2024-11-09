import { getPlanets } from "@/services";
import { PlanetsResult } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function setQueryKey(search: string | null, page?: string) {
  const QUERY_KEY = "GET_PLANETS";

  return [QUERY_KEY, ...(search ? [search] : []), ...(page ? [page] : [])];
}

export function useGetPlanets(search: string | null, page?: string) {
  return useQuery<PlanetsResult, Error>({
    queryKey: setQueryKey(search, page),
    queryFn: () => getPlanets(search, page),
  });
}

export function useSearch() {
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  function setSearch(query: string) {
    params.set("search", query);

    window.history.pushState(null, "", `?${params.toString()}`);
  }

  function getSearch() {
    return params.get("search");
  }

  return {
    getSearch,
    setSearch,
  };
}

export function useDebounce(value: string | null, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}
