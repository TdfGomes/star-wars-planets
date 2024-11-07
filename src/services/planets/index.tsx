import { PlanetsResult } from "@/types";
import { BASE_URL } from "../constants";

export async function getPlanets(page = "1"): Promise<PlanetsResult> {
  const queryParams = new URLSearchParams({
    page,
  });

  try {
    const data = await fetch(`${BASE_URL}/planets?${queryParams}`);

    return data.json();
  } catch (e) {
    //send the error to a monitoring tool
    //sendError(e.message)
    console.error(e);
    //throw an useful error to the user
    throw new Error("Something went wrong. It's not possible to fetch planets at the moment");
  }
}

export async function getPlanet(name: string): Promise<PlanetsResult> {
  const queryParams = new URLSearchParams({
    search: name,
  });

  try {
    const data = await fetch(`${BASE_URL}/planets?${queryParams}`);
    return data.json();
  } catch (e) {
    //send the error to a monitoring tool
    //sendError(e.message)
    console.error(e);
    //throw an useful error to the user
    throw new Error(
      `Something went wrong. It's not possible to fetch planet ${name} at the moment`,
    );
  }
}
