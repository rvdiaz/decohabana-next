export const getExtraServicesQuery = `
query getExtraServices($tenant: TenantData!){
    getExtraServices(tenant: $tenant){
        id
        name
        description
        image {
            url
            alt
            s3Key
        }
        createdAt
        available
        price {
            amount
            currencyCode
        }
    }
}
`;
