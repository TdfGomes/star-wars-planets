import { getPlanets } from "@/services";
import { Planet, PlanetsResult } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const QUERY_KEY = "GET_PLANETS";

export function useInfinitePlanets(search: string | null) {
  const observer = useRef<IntersectionObserver>();
  const { data, fetchNextPage, isLoading, hasNextPage, isFetching, ...rest } = useInfiniteQuery<
    PlanetsResult,
    Error
  >({
    queryKey: [QUERY_KEY, ...(search ? [search] : [])],
    queryFn: ({ pageParam }) => getPlanets(search, pageParam as string),
    initialPageParam: "1",
    getNextPageParam: (lastPage) => {
      const url = new URL(lastPage.next);
      const searchParams = new URLSearchParams(url.search);

      return searchParams.get("page");
    },
  });

  const ref = useCallback(
    (node: HTMLLIElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading],
  );

  const planets = useMemo(() => {
    return data?.pages.reduce((acc: Planet[], page) => {
      return [...acc, ...page.results];
    }, []);
  }, [data]);

  return {
    ...rest,
    data: planets,
    ref,
    isLoading,
    hasNextPage,
    isFetching,
  };
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
