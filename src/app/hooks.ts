import { getPlanets } from "@/services";
import { PlanetsResult } from "@/types";
import { useQuery } from "@tanstack/react-query";

const QUERY_KEY = "GET_PLANETS";

export function useGetPlanets(page?: string) {
  return useQuery<PlanetsResult, Error>({
    queryKey: [QUERY_KEY],
    queryFn: () => getPlanets(page),
  });
}
