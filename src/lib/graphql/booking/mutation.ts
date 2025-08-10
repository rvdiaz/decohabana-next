export const updateBookingMutation = `
 mutation updateBooking(
    $tenant: TenantData!
    $bookingId: ID!
    $booking: BookingUpdateInput
  ) {
    updateBooking(tenant: $tenant, bookingId: $bookingId, booking: $booking) {
      id
      createdAt
      endDate
      startDate
      status
      note
      bookingBusinessData {
        car {
          id
          brand
          model
          carType {
            id
            name
            supportsHourly
            hourlyRate
            supportsDistance
            pricePerMiles
            baseFare
            minimumFare
            tripQuotePrice
          }
        }
        customer {
          id
          name
          email
          phone
        }
        driver {
          id
          name
          email
          phone
        }
        dropoffLocation {
          displayName
          formattedAddress
          id
        }
        extraServices {
          id
          name
          price {
            amount
            currencyCode
          }
        }
        pickupLocation {
          displayName
          formattedAddress
          id
        }
        totalPrice {
          amount
          currencyCode
        }
        bookHours
        bookMode
      }
    }
  }
`;
