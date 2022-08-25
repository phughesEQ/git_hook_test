import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { FunctionUrlAuthType, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface LambdaProps extends StackProps {
  readonly environment: string
}

export class TsLambdaStack extends Stack {
  public readonly lambdaUrls: CfnOutput[] = [];
  public readonly lambdaNames: CfnOutput[] = [];

  constructor(scope: Construct, id: string, props: LambdaProps) {
    super(scope, id, props);

    const lambdaNames = ["index", "someHandler"];

    const lambdas: NodejsFunction[] = lambdaNames.map(name => {
      return new NodejsFunction(
        this,
        `${name}_us-east-1_${props.environment}`,
        {
          runtime: Runtime.NODEJS_16_X,
          entry: `src/handler/${name}.ts`,
          handler: "handler",
          timeout: Duration.seconds(30),
          memorySize: 128,
          bundling: { minify: true }
        });
    });


    lambdas.map(lambda => {
      const url = lambda.addFunctionUrl({
        authType: FunctionUrlAuthType.NONE,
        cors: { allowedOrigins: ["*"] }
      });

      this.lambdaUrls.push(new CfnOutput(this, `${lambda.node.id}-url`, {
        value: url.url
      }));

      this.lambdaNames.push(new CfnOutput(this, `${lambda.node.id}-name`, {
        value: lambda.functionName
      }));
    });

  }
}