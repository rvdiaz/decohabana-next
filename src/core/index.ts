const tenantId = process.env.TENANTID;
const solutionId = process.env.TENANT_SOLUTION;

export const getQueriesVariables = {
  tenant: {
    tenantId,
    solutionId,
  },
};
