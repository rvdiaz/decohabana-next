export const getCustomerQuery = `
query getCustomer($tenant: TenantData!, $customerId: ID!){
    getCustomer(tenant: $tenant, customerId: $customerId){
        id
        name
        email
        phone
    }
}
`;
