"use client";

import { use } from "react";
import { useGetPlanetById } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { MappedPlanet } from "@/types";
import Details from "./components/details";
import { iconsMap } from "./constants";
import { ChevronLeft, ChevronRight } from "./components/chevrons";
import styles from "./page.module.css";
import Link from "next/link";

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

  const handleOnGoBack = () => {
    router.push("/");
  };

  const prevPlanet = parseInt(id) - 1;
  const nextPlanet = parseInt(id) + 1;

  return (
    <div className={styles.container}>
      {prevPlanet >= 1 && (
        <Link className={styles.link} href={`/planets/${prevPlanet}`} title="Go to previous planet">
          <ChevronLeft />
        </Link>
      )}
      <Details title={planetName} details={details} onClick={handleOnGoBack} icons={iconsMap} />
      {nextPlanet <= 60 && (
        <Link className={styles.link} href={`/planets/${nextPlanet}`} title="Go to next planet">
          <ChevronRight />
        </Link>
      )}
    </div>
  );
}
