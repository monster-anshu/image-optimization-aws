import { handlerPath } from "@/libs/handler-resolve";
import { AwsFunction } from "@/types";

export const cfRequestHandler = {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  memorySize: 128,
  timeout: 1,
  lambdaAtEdge: {
    distribution: "ImageDeliveryDistribution",
    eventType: "viewer-request",
  },
} as AwsFunction;
