// Axios Imports
import { AxiosRequestConfig } from "axios";
import { axiosPosthog } from "./axios-posthog";

export function insights_trend(req: Req, { project_id }: PathParams) {
  return axiosPosthog({
    url: `/projects/${project_id}/insights/trend/`,
    ...req,
  });
}

export interface Res {}

export interface PathParams {
  project_id: number;
}

export interface Req extends AxiosRequestConfig {
  params: Params;
}

export interface Params {
  client_query_id: string;
  compare: string;
  date_from: string;
  display: string;
  entity_type: string;
  events: string;
  insight: string;
  interval: string;
  session_id: string;
}

export interface Event {
  id: string;
  math: string;
  name: string;
  order: number;
  type: string;
  properties?: Property[];
}

export interface Property {
  key: string;
  operator: string;
  type: string;
  value: string;
}
