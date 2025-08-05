// app/booking/select-car/page.tsx
import { getExtraServices } from "@/lib/actions/extraServices";
import { BookingRouteGuard } from "@/components/Booking/BookingRoutesGuard";
import CarSelection from "@/components/CarSelection";

export default async function SelectCar() {
  const extraServices = await getExtraServices();

  return (
    <BookingRouteGuard>
      <CarSelection extraServices={extraServices} />
    </BookingRouteGuard>
  );
}
