#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { TsLambdaStack } from "../lib/lambda-dedup-stack";
import { ObservabilityStack } from "../lib/observability-stack";

const app: App = new App();

const lambdas = new TsLambdaStack(app, "CdkTestStack", {
  environment: 'staging'
});

const observability = new ObservabilityStack(app, "ObservabilityTestStack", {
  lambdaNames: lambdas.lambdaNames.map(name => name.value)
});