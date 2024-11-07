import { http, HttpResponse } from "msw";
import { mockPlanets } from "./fixtures/planets";

export const handlers = [http.get("*/planets", () => HttpResponse.json(mockPlanets))];
