// app/booking/select-car/CarSelectionWrapper.tsx
import { getExtraServices } from "@/lib/actions/extraServices";
import CarSelection from "@/components/CarSelection";

export default async function CarSelectionWrapper() {
  const extraServices = await getExtraServices();
  return <CarSelection extraServices={extraServices} />;
}
