import { Runtime } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { App, StackProps } from "@aws-cdk/core";

export class TsLambdaStack extends cdk.Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    new NodejsFunction(this, 'helloWorldFn', {
      runtime: Runtime.NODEJS_14_X,
      entry: `${__dirname}/../src/index.ts`,
      handler: 'lambdaHandler',
      memorySize: 128,
      bundling: {
        minify: true,
      }
    })
  }
}