import { handlerPath } from "@/libs/handler-resolve";
import { AwsFunction } from "@/types";

export const imageProcessing: AwsFunction = {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  name: "${self:custom.IMAGE_PROCESSING_FUNCTION}",
  timeout: 1,
};
