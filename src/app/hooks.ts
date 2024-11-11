import { getPlanets, getPlanetById, initialUrl } from "@/services";
import { Planet, PlanetsResult, MappedPlanet } from "@/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const QUERY_KEY = Object.freeze({
  getPlanets: "GET_PLANETS",
  getPlanetById: "GET_PLANET_BY_ID",
});

export function useInfinitePlanets(search: string | null) {
  const observer = useRef<IntersectionObserver>();
  const { data, fetchNextPage, isLoading, hasNextPage, isFetching, ...rest } = useInfiniteQuery<
    PlanetsResult,
    Error
  >({
    queryKey: [QUERY_KEY.getPlanets, ...(search ? [search] : [])],
    queryFn: ({ pageParam }) => getPlanets(search, pageParam as string),
    initialPageParam: initialUrl,
    getNextPageParam: (lastPage) => {
      return lastPage.next;
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
    [fetchNextPage, isLoading, hasNextPage, isFetching],
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

function selectPlanetDetails({
  name,
  rotation_period,
  orbital_period,
  diameter,
  climate,
  gravity,
  terrain,
  surface_water,
  population,
}: Planet) {
  return {
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population,
  };
}

export function useGetPlanetById(id: string) {
  return useQuery<Planet, Error, MappedPlanet>({
    queryKey: [QUERY_KEY, id],
    queryFn: () => getPlanetById(id),
    select: selectPlanetDetails,
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
