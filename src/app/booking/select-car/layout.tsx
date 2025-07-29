"use server";

import { IExtraServices } from "@/interfaces/extraServices";
import React from "react";
import CarSelectionPage from "./page";
import { getExtraServices } from "@/lib/actions/extraServices";

export default async function SelectCar({
  children,
}: {
  children: React.ReactNode;
}) {
  const extraServices: IExtraServices[] = await getExtraServices();

  return <CarSelectionPage extraServices={extraServices} />;
}
