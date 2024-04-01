export interface IUser {
  id: number;
  email: string;
  avatar: string;
  first_name: string;
  last_name: string;
}

export interface IUsersResponse {
  data: IUser[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface IUserDetailsResponse {
  data: IUser;
}
