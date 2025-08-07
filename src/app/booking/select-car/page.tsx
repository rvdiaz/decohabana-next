import CarSelectionWrapper from "@/components/CarSelection/carSelectionWrapper";
import { PageLoading } from "@/components/CodidgeUI/pageLoading";
import { Suspense } from "react";

export default function SelectCarPage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <CarSelectionWrapper />
    </Suspense>
  );
}
