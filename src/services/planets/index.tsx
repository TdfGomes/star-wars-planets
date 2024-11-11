import { Planet, PlanetsResult } from "@/types";
import { BASE_URL } from "../constants";

export const initialUrl = `${BASE_URL}/planets?page=1`;

export async function getPlanets(
  search?: string | null,
  page?: string | null,
): Promise<PlanetsResult> {
  const url = !page ? initialUrl : page;

  try {
    const data = await fetch(!search ? url : `${url}&search=${search}`);

    return data.json();
  } catch (e) {
    //send the error to a monitoring tool
    //sendError(e.message)
    console.error(e);
    //throw an useful error to the user
    throw new Error("Something went wrong. It's not possible to fetch planets at the moment");
  }
}

export async function getPlanetById(id: string): Promise<Planet> {
  try {
    const data = await fetch(`${BASE_URL}/planets/${id}`);

    return data.json();
  } catch (e) {
    //send the error to a monitoring tool
    //sendError(e.message)
    console.error(e);
    //throw an useful error to the user
    throw new Error(
      `Something went wrong. It's not possible to fetch planet with id: ${id} at the moment`,
    );
  }
}
