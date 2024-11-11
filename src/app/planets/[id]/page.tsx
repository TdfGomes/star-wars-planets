"use client";

import { use } from "react";
import { useGetPlanetById } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { MappedPlanet } from "@/types";
import Details from "./components/details";
import { iconsMap } from "./constants";

interface PlanetId {
  id: string;
}
interface PlanetDetailsProps {
  params: Promise<PlanetId>;
}

export default function PlanetDetails({ params }: PlanetDetailsProps) {
  const { id } = use<PlanetId>(params);
  const router = useRouter();
  const { data: planet, isLoading } = useGetPlanetById(id);

  if (isLoading) return <h1>Loading...........</h1>;

  const { name: planetName, ...details } = planet as MappedPlanet;

  const handleOnClick = () => {
    router.push("/");
  };

  return <Details title={planetName} details={details} onClick={handleOnClick} icons={iconsMap} />;
}
