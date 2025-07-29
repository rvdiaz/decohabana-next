export const addCustomerMutation = `
mutation addCustomer($tenant: TenantData!, $customer: CustomerInput!){
    addCustomer(tenant: $tenant, customer: $customer){
        id
        name
        email
        phone
        externalReference {
            referenceId
            sourceHandler
        }
    }
}
`;
