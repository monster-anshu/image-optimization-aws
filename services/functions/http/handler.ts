import type {
  Handler,
  LambdaFunctionURLEvent,
  LambdaFunctionURLResult,
} from "aws-lambda";

export const handler: Handler<
  LambdaFunctionURLEvent,
  LambdaFunctionURLResult
> = async () => {
  return {
    statusCode: 200,
    body: "Hello world",
  };
};
