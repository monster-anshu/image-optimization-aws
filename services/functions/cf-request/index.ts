import { handlerPath } from "@/libs/handler-resolve";
import { AwsFunction } from "@/types";

export const cfRequestHandler = {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  lambdaAtEdge: {
    distribution: "ImageDeliveryDistribution",
    eventType: "viewer-request",
  },
};
