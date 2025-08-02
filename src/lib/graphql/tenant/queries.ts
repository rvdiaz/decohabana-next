export const getTenantConfig = `
  query getTenant($id: ID!) {
    getTenant(id: $id) {
      id
      fullName
      solutions {
        name
        slug
        tenantModules {
          label
          moduleKey
          metaData
        }
      }
    }
  }
`;
