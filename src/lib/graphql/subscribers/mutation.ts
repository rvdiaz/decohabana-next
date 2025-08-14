export const addSubscriberMutation = `
  mutation addSubscriber(
    $tenant: TenantData!
    $subscriber: AddSubscriberInput!
  ) {
    addSubscriber(tenant: $tenant, subscriber: $subscriber){
        name
        email
    }
  }
`;
