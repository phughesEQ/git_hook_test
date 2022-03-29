#!/usr/bin/env node
import 'source-map-support/register';
import { TsLambdaStack } from "../lib/cdk-test-stack";
import { App } from "aws-cdk-lib";

const app = new App();
new TsLambdaStack(app, 'CdkTestStack', {});