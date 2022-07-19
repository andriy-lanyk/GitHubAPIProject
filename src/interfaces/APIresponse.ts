import { IRepository } from "./repository";
import { IUser } from "./user";

export interface IUsersResponse {
  data: {
    total_count: number;
    incomplete_results: boolean;
    items: IUser[];
  };
}

export interface IRepositoryResponse {
  data: IRepository[];
}