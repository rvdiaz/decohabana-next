export const getCarClassesAvilabilityQuery = `
    query getCarTypesAvailable($tenant: TenantData!,$input: CarTypesAvailabilityInput!){
        getCarTypesAvailable(tenant: $tenant,input: $input){
            carTypes {
                id
                name
                description
                maxPassengers
                image {
                    url
                    alt
                    s3Key
                }
                features {
                    label
                    value
                }
                supportsHourly
                supportsDistance
                hourlyRate
                pricePerMiles
                baseFare
                minimumFare
                tripQuotePrice
            }
            endDate
        }
    }
`;
