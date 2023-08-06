export interface userPlan {
  ID: string;
  userName: string;
  planName: string;
  amount: string;
  currency: string;
  characteristicsPlan: string[];
  process: string;
  buyId: string;
  initialDate: Date;
  endDate: Date;
  purchaseIdentifier: string;
  account_status: string;
  email_address_paypal: string;
  planId: string;
  createdAt: string;
  updatedAt: string;
  SportsInstitutionID: string;
}

export interface createPagoResponse {
  url: string;
}
