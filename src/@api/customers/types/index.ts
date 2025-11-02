export interface CustomerRequest {
  count: number;
  list: CustomerResponse[];
}
export interface CustomerDetailRequest {
  accountNumber: string
}
export interface CustomerDetailResponse{
  accountNumber: string
}

export interface CustomerResponse {
  number: string;
  status: string;
  statusCode: string;
  statusDate: string; // ISO date string
  identifier: string | null;
  providerName: string;
  partyId: string | null;
  currency: string;
  currencyCode: string;
  accountOwner: string;
  availableBalance: number;
  blockBalance: number;
  monetaryBalance: number;
  hasUserEbank: boolean;
  hasUserRole: boolean;
  disabled: boolean;
}
