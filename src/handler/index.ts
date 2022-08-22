import { APIGatewayEvent, Context, Handler } from 'aws-lambda';

export const handler: Handler = async (event: APIGatewayEvent, context: Context) => {
    return {
        statusCode: 200,
        body: 'Hello world',
    };
};
