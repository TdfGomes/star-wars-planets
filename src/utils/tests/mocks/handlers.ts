import { http, HttpResponse } from "msw";
import { mockPlanets } from "./fixtures/planets";

export const handlers = [
  http.get("*/planets", ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search");

    if (!search) {
      return HttpResponse.json(mockPlanets);
    }

    return HttpResponse.json({
      ...mockPlanets,
      results: mockPlanets.results.filter(({ name }) => new RegExp(search, "i").test(name)),
    });
  }),
];
