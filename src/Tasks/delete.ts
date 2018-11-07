import { Task } from "./Task";

export type Event = AWSLambda.APIGatewayEvent;
export type Context = AWSLambda.Context;
export type Callback = (error: Error, result: any) => void;

export default (event: Event, context: Context, callback: Callback) => {
  if (event.queryStringParameters['id'] == undefined) {
    callback(new Error("Missing Task Id"), "missing_task_id");
  }

  let params = {
    id: event.queryStringParameters['id'],
    userId: event.requestContext.identity.cognitoIdentityId
  };

  Task.delete(params, (error: Error | null) => {
    if (error) {
      callback(error, "error");
    }
    callback(null, {
      statusCode: 200,
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ status: "OK", message: { deleted: params } })
    });
  });
};
