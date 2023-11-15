// Axios Imports
import { AxiosRequestConfig } from "axios";
import { axiosPosthog } from "./axios-posthog";

export function insights_trend(req: Req, { project_id }: PathParams) {
  return axiosPosthog<unknown, Res>({
    url: `/projects/${project_id}/insights/trend/`,
    ...req,
  });
}

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
  refresh?: boolean;
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
export interface Res {
  is_cached: boolean;
  last_refresh: string;
  next: string | null;
  timezone: string;
  result: Result[];
}

export interface Result {
  label: string;
  count: number;
  data: number[];
  labels: string[];
  action: Action;
}

export interface Action {
  id: string;
}
