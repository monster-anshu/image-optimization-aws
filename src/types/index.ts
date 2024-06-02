import type { AWS } from "@serverless/typescript";

export type AwsFunction = NonNullable<AWS["functions"]>[string];
