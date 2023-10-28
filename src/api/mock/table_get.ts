// Axios Imports
import { axiosMock } from "./axios-mock";
import { AxiosRequestConfig } from "axios";
import { Row } from "@/api/fakedb/mock-table";

export function table_get(req: Req) {
  return axiosMock<unknown, Res>({
    url: "/table",
    ...req,
  });
}

export interface Req extends AxiosRequestConfig {
  params: {
    page: number;
    pageSize: number;
    id?: number;
    name?: string;
    age?: number;
  };
}
export interface Res {
  rows: Row[];
  total: number;
}
