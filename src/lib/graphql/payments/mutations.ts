export const payChargeMutation = `mutation payBooking($tenant: TenantData!, $bookingDetails: CarTypesAvailabilityInput!, $carTypeDetails: CarTypeBookingInput!, $cardToken: String!, $totalPrice: PricesInput!, $customerData: BookingCustomerInput!){
    payBooking(tenant: $tenant, bookingDetails: $bookingDetails, carTypeDetails: $carTypeDetails, cardToken: $cardToken, totalPrice: $totalPrice, customerData: $customerData){
        success
        booking {
            id
            bookingCode
        }
        message
        customerExternalReference {
            sourceHandler
            referenceId
        }
    }
  }
`;
