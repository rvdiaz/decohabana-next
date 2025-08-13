import React from "react";
import { getCarsAction } from "@/lib/actions/cars";
import { CarList } from "./carList";

export async function CarContainers() {
  const cars = await getCarsAction();

  return <CarList initialCarList={cars?.getCarTypes ?? []} />;
}
