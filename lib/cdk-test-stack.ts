import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { FunctionUrlAuthType, Runtime} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";

export class TsLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

     const table = new Table(this, "Hello", {
      partitionKey: { name: "name", type: AttributeType.STRING },
    });

    const dynamoLambda = new NodejsFunction(this, "helloWorldFn", {
      runtime: Runtime.NODEJS_16_X,
      entry: "src/index.ts",
      handler: "handler",
      timeout: Duration.seconds(30),
      memorySize: 128,
      bundling: {
        minify: true
      },
      environment: {
        HELLO_TABLE_NAME: table.tableName,
      },
    });

    table.grantReadWriteData(dynamoLambda);

    const myFunctionUrl = dynamoLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
      }
    });

    new CfnOutput(this, 'FunctionUrl', {
      value: myFunctionUrl.url,
    });

  }
}