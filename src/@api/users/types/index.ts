export interface UsersPayload {
  id: number;
  userFullName: string;
  username: string;
  roleTypeCode: string;
  state: string;
  from: number;
  size: number;
}
export interface UserDetailPayload {
  username: string;
}

export interface UserDetailResponse {
  userId: number;
  profileId: number;
  username: string;
  userFullName: string;
  nationalCode: string;
  mobileNumber: string;
  brithDate: string;
  tenant: string;
  disabled: false;
  passwordSetDate: string;
}
export interface UsersResponse {
  count: number;
  list: UsersPayload[];
}
