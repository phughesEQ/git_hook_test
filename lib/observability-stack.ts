import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Dashboard, GraphWidget, Metric } from "aws-cdk-lib/aws-cloudwatch";

interface ObservabilityProps extends StackProps {
  readonly lambdaNames: string[]
}

export class ObservabilityStack extends Stack {
  constructor(scope: Construct, id: string, props: ObservabilityProps) {
    super(scope, id, props);

    const dashboard = new Dashboard(this, `Test-Lambda-Dashboard`, {
      dashboardName: "Test-Lambda-Metrics"
    });

    props.lambdaNames.map(name => {
      dashboard.addWidgets(
        new GraphWidget({
          title: `${name} AWS Function URL 4xx/5xx errors (sum)`,
          width: 12,
          left: [
            new Metric({
              namespace: "AWS/Lambda",
              metricName: "Url5xxCount",
              dimensionsMap: {
                FunctionName: name
              },
              statistic: "sum",
              label: `${name} Sum 5xx Errors`,
              period: Duration.minutes(1)
            }),
            new Metric({
              namespace: "AWS/Lambda",
              metricName: "Url4xxCount",
              dimensionsMap: {
                FunctionName: name
              },
              statistic: "sum",
              label: `${name} Sum 4xx Errors`,
              period: Duration.minutes(1)
            })
          ]
        }),
        new GraphWidget({
          title: `${name} AWS Function Errors (sum)`,
          width: 12,
          left: [
            new Metric({
              namespace: "AWS/Lambda",
              metricName: "Errors",
              dimensionsMap: {
                FunctionName: name
              },
              statistic: "sum",
              label: `${name} Sum`,
              period: Duration.minutes(1)
            })
          ]
        }),
        new GraphWidget({
          title: `${name} AWS Function URL Request Duration and Latency (p99)`,
          width: 12,
          left: [
            new Metric({
              namespace: "AWS/Lambda",
              metricName: "UrlRequestLatency",
              dimensionsMap: {
                FunctionName: name
              },
              statistic: "p99",
              label: `${name} p99 Latency`,
              period: Duration.minutes(1)
            }),
            new Metric({
              namespace: "AWS/Lambda",
              metricName: "Duration",
              dimensionsMap: {
                FunctionName: name
              },
              statistic: "p99",
              label: `${name} p99 Duration`,
              period: Duration.minutes(1)
            })
          ]
        }),
        new GraphWidget({
          title: `${name} AWS Function Invocations (sum)`,
          width: 12,
          left: [
            new Metric({
              namespace: "AWS/Lambda",
              metricName: "Invocations",
              dimensionsMap: {
                FunctionName: name
              },
              statistic: "sum",
              label: `${name} Sum`,
              period: Duration.minutes(1)
            })
          ]
        }),
        new GraphWidget({
          title: `${name} AWS Function Concurrent executions (Max)`,
          width: 12,
          left: [
            new Metric({
              namespace: "AWS/Lambda",
              metricName: "ConcurrentExecutions",
              dimensionsMap: {
                FunctionName: name
              },
              statistic: "max",
              label: `${name} Max`,
              period: Duration.minutes(1)
            })
          ]
        })
      );
    })
  }


}