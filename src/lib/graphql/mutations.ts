export const getImagesUploadUrl = `
  mutation getImagesUploadUrl(
    $tenant: TenantData!
    $imgInput: UploadUrlImageInput!
  ) {
    getImagesUploadUrl(tenant: $tenant, imgInput: $imgInput) {
      uploadUrl
      fileUrl
    }
  }
`;

export const createQuoteMutation = `
  mutation createQuote($tenant: TenantData!, $input: CreateQuoteInput!){
    createQuote(tenant: $tenant, input: $input) {
      message
      success
    }
  }
`;
