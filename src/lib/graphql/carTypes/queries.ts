export const getCarClassesQuery = `
    query getCarTypes($tenant: TenantData!){
        getCarTypes(tenant: $tenant){
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
            hourlyRate
            pricePerKm
        }
    }
`;
