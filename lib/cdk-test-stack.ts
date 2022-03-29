import { App, aws_s3 as s3, Duration, Stack, StackProps } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Effect, PolicyStatement, ServicePrincipal } from "aws-cdk-lib/aws-iam";

export class TsLambdaStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    new NodejsFunction(this, "helloWorldFn", {
      runtime: Runtime.NODEJS_14_X,
      entry: "src/index.ts",
      handler: "lambdaHandler",
      timeout: Duration.seconds(30),
      memorySize: 128,
      bundling: {
        minify: true
      }
    });

    const bucket = new s3.Bucket(this, "CdkTestBucket", {
      encryption: s3.BucketEncryption.KMS,
      bucketKeyEnabled: true,
      enforceSSL: true
    });

    bucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        principals: [new ServicePrincipal("lambda.amazonaws.com")],
        actions: ["s3.GetObject"],
        resources: [`${bucket.bucketArn}`]
      })
    );
  }
}