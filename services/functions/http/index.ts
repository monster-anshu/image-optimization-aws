import { handlerPath } from "@/libs/handler-resolve";
import { AwsFunction } from "@/types";

export const httpRequestHandler: AwsFunction = {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  events: [
    {
      httpApi: {
        method: "get",
        path: "/",
      },
    },
  ],
};
