import type { AWS } from "@serverless/typescript";
import type { BuildOptions } from "esbuild";

import * as functions from "./services/functions/index";

const serverlessConfiguration: AWS = {
  service: "image-optimization-api",
  frameworkVersion: "3",
  useDotenv: true,
  plugins: [
    "serverless-deployment-bucket",
    "serverless-esbuild",
    "serverless-offline",
    "serverless-prune-plugin",
    "serverless-s3-sync",
  ],
  custom: {
    esbuild: {
      external: ["@aws-sdk/*"],
      minify: true,
    } as BuildOptions,
    prune: {
      automatic: true,
      number: 3,
    },
    "serverless-offline": {
      noPrependStageInUrl: true,
      disableCookieValidation: true,
      httpPort: 3000,
      lambdaPort: 3002,
    },
    s3Sync: [
      {
        bucketName: "${self:custom.ORIGINAL_IMAGE_BUCKET}",
        localDir: "images",
      },
    ],
    ORIGINAL_IMAGE_BUCKET: "monster-anshu-image-optimization-original",
    TRANSFORMED_IMAGE_BUCKET: "monster-anshu-image-optimization-transformed",
    DEPLOYMENT_BUCKET: "monster-anshu-image-optimization-api",
    IMAGE_PROCESSING_FUNCTION:
      "${self:service}-${self:provider.stage}-image-processing-function",
  },
  provider: {
    name: "aws",
    profile: "personaluser",
    runtime: "nodejs20.x",
    memorySize: 128,
    timeout: 29,
    region: "us-east-1",
    stage: "dev",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      IMAGE_PROCESSING_FUNCTION: "${self:custom.IMAGE_PROCESSING_FUNCTION}",
    },
    deploymentBucket: {
      name: "${self:custom.DEPLOYMENT_BUCKET}",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Resource: "*",
            Action: "lambda:InvokeFunction",
          },
        ],
      },
    },
  },
  resources: {
    Resources: {
      OriginalImageBucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: "${self:custom.ORIGINAL_IMAGE_BUCKET}",
        },
      },

      TransformedImageBucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: "${self:custom.TRANSFORMED_IMAGE_BUCKET}",
        },
      },

      ImageDeliveryDistribution: {
        Type: "AWS::CloudFront::Distribution",
        Properties: {
          DistributionConfig: {
            DefaultCacheBehavior: {
              TargetOriginId: "TransformedImageOrigin",
              ViewerProtocolPolicy: "redirect-to-https",
              DefaultTTL: 600,
              MaxTTL: 600,
              Compress: true,
              ForwardedValues: {
                QueryString: false,
                Cookies: {
                  Forward: "none",
                },
              },
            },
            Enabled: true,
            PriceClass: "PriceClass_100",
            HttpVersion: "http2",
            ViewerCertificate: {
              CloudFrontDefaultCertificate: true,
            },
            Origins: [
              {
                Id: "TransformedImageOrigin",
                DomainName: {
                  "Fn::GetAtt": ["TransformedImageBucket", "DomainName"],
                },
                S3OriginConfig: {},
              },
            ],
          },
        },
      },
    },
  },
  package: { individually: true },
  functions: functions,
};

module.exports = serverlessConfiguration;
