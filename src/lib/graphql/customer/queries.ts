export const getCustomerQuery = `
query getCustomer($tenant: TenantData!, $customerId: ID!){
    getCustomer(tenant: $tenant, customerId: $customerId){
        id
        name
        email
        phone
        externalReference {
            referenceId
            sourceHandler
        }
        welcomeCoupon {
            id
            description
            code
        }
    }
}
`;

export const getCustomerBooking = `
    query getCustomerBooking($customerId: ID!, $tenant: TenantData!) {
        getCustomerBooking(customerId: $customerId, tenant: $tenant) {
         past {
            bookingCode
            id
            startDate
            status
            createdAt
            endDate
            note
            bookingBusinessData {
                bookHours
                bookMode
                car {
                id
                model
                brand
                carType {
                    name
                }
                }
                driver {
                id
                name
                phone
                email
                }
                pickupLocation {
                displayName
                formattedAddress
                id
                }
                dropoffLocation {
                displayName
                formattedAddress
                id
                }
            }
         }
         upcoming {
            bookingCode
            id
            startDate
            status
            createdAt
            endDate
            note
            bookingBusinessData {
                bookHours
                bookMode
                car {
                id
                model
                brand
                carType {
                    name
                }
                }
                driver {
                id
                name
                phone
                email
                }
                pickupLocation {
                displayName
                formattedAddress
                id
                }
                dropoffLocation {
                displayName
                formattedAddress
                id
                }
            }
         }
        }
    }
`;
