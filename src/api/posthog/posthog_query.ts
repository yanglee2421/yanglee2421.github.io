// Axios Imports
import { AxiosRequestConfig } from "axios";
import { axiosPosthog } from "./axios-posthog";

export function posthog_query(req: Req, pathParams: PathParams) {
  const { project_id } = pathParams;

  return axiosPosthog<unknown, Res, Data>({
    url: `/projects/${project_id}/query/`,
    method: "POST",
    ...req,
  });
}

export interface PathParams {
  project_id: number;
}

export type Req = AxiosRequestConfig<Data>;

export interface Data {
  query: Query;
  refresh: boolean;
  client_query_id: string;
}

export interface Query {
  kind: string;
  select: string[];
  event: string;
  properties?: Property;
}

export interface Property {
  key: string;
  value: string;
  operator: string;
  type: string;
}

export interface Res {
  columns: string[];
  hasMore: boolean;
  hogql: string;
  result: [];
}

export type Result = [Event, string, Person, string, string, string];

export interface Event {
  uuid: string;
  event: string;
}

export interface Person {
  uuid: string;
}
