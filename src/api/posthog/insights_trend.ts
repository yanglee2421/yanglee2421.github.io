// Axios Imports
import { axiosPosthog } from "./axios-posthog";

export function insights_trend() {
  return axiosPosthog({
    url: "/projects/:project_id/insights/trend/",
  });
}
