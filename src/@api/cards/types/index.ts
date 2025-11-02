export interface AccountCardsRequest {
  cardNumber: string;
  accountNumber: string;
  mediaTypeCode: string;
  status: string;
  issueDate: string;
}

export interface AccountCardsResponse {
  items: AccountCardsRequest[];
  totalCount: number;
}

export interface MediaType {
  code: string;
  name: string;
  description?: string;
}

export interface MediaTypeResponse {
  mediaTypes: MediaType[];
}
export interface ExportExcelResponse {
  fileName: string;
  base64Data: string;
}

export interface ExportExcelType {
  accountNumber: string;
  mediaTypeCode: string;
  fileType:string
}
