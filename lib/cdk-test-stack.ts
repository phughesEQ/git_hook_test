import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { FunctionUrlAuthType, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class TsLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambda = new NodejsFunction(this, "helloWorldFn", {
      runtime: Runtime.NODEJS_16_X,
      entry: "src/handler/index.ts",
      handler: "handler",
      timeout: Duration.seconds(30),
      memorySize: 128,
      bundling: {
        minify: true
      },
    });

    const myFunctionUrl = lambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ["*"]
      }
    });

    new CfnOutput(this, "FunctionUrl", {
      value: myFunctionUrl.url
    });

  }
}