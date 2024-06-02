import { handlerPath } from "@/libs/handler-resolve";
import { AwsFunction } from "@/types";

export const cfRequestHandler: AwsFunction = {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  events: [
    {
      cloudFront: {
        eventType: "viewer-request",
      },
    },
  ],
};
