import type { Handler, CloudFrontRequest } from "aws-lambda";

export const handler: Handler<CloudFrontRequest> = async (event) => {
  const request = event;
  console.log(event, "my event");
  return request;
};
