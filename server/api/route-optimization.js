import { v1 } from "@googlemaps/routeoptimization";
import mock from "./mock";
const { RouteOptimizationClient } = v1;
const routeOptimizationClient = new RouteOptimizationClient();

const model = {
  model: {
    shipments: [
      {
        pickups: [
          {
            arrivalLocation: {
              latitude: 37.73881799999999,
              longitude: -122.4161,
            },
          },
        ],
        deliveries: [
          {
            arrivalLocation: {
              latitude: 37.79581,
              longitude: -122.4218856,
            },
          },
        ],
      },
    ],
    vehicles: [
      {
        startLocation: {
          latitude: 37.73881799999999,
          longitude: -122.4161,
        },
        endLocation: {
          latitude: 37.73881799999999,
          longitude: -122.4161,
        },
        costPerKilometer: 1.0,
      },
    ],
    //   "globalStartTime": "2024-02-13T00:00:00.000Z",
    //   "globalEndTime": "2024-02-14T06:00:00.000Z"
  },
};

export default defineEventHandler(async () => {
  return mock;

  // 基本はmockから呼び出します。必要な場合はモックをコメントアウトしてください。
  const config = useRuntimeConfig();
  const response = await routeOptimizationClient.optimizeTours({
    parent: `projects/${config.googleProjectKey}`,
    populateTransitionPolylines: true,
    ...model,
  });
  return response;
});
