import type {
  Handler,
  LambdaFunctionURLEvent,
  LambdaFunctionURLResult,
} from "aws-lambda";
import {
  LambdaClient,
  InvokeCommand,
  LambdaClientConfig,
} from "@aws-sdk/client-lambda";
import { toUtf8 } from "@aws-sdk/util-utf8-node";

const options: LambdaClientConfig = {
  region: "us-east-1",
};

if (process.env.IS_OFFLINE === "true") {
  options.endpoint = "http://localhost:3002";
}

const client = new LambdaClient(options);

export const handler: Handler<
  LambdaFunctionURLEvent,
  LambdaFunctionURLResult
> = async () => {
  const command = new InvokeCommand({
    FunctionName: process.env.IMAGE_PROCESSING_FUNCTION,
    InvocationType: "RequestResponse",
  });
  const result = await client.send(command);
  if (result.Payload) {
    console.log(toUtf8(result.Payload));
  }
  return {
    statusCode: 200,
    body: "Hello world",
  };
};
