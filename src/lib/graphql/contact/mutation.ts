export const contactSubmission = `
  mutation contactSubmission(
    $tenant: TenantData!
    $formData: ContactFormDataInput!
  ) {
    contactSubmission(tenant: $tenant, formData: $formData)
  }
`;
