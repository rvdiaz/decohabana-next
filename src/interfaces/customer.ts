export interface ICustomerInput {
  id: string;
  name: string;
  email: string;
  phone: string;
  externalReference: {
    referenceId: string;
    sourceHandler: string;
  };
}

export type ICustomer = {
  id: string;
  email: string;
  name: string;
  phone: string;
  externalReference: {
    referenceId: string;
    sourceHandler: string;
  };
};
