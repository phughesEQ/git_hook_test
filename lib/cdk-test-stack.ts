import { App, Duration, Stack, StackProps } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";

export class TsLambdaStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    new NodejsFunction(this, 'helloWorldFn', {
      runtime: Runtime.NODEJS_14_X,
      entry: 'src/index.ts',
      handler: 'lambdaHandler',
      timeout: Duration.seconds(30),
      memorySize: 128,
      bundling: {
        minify: true,
      }
    })
  }
}