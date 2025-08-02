export interface ITenant {
  _id: string;
  fullName: string;
  solutions: ITenantSolutions[];
}

export interface ITenantSolutions {
  name: string;
  slug: string;
  tenantModules: ITenantModule[];
}

export interface ITenantModule {
  label?: string;
  moduleKey: string;
  path: string;
  type?: string;
  metaData: string;
}
