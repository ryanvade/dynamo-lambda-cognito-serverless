import { Task } from "./Task";

export type Event = AWSLambda.APIGatewayEvent;
export type Context = AWSLambda.Context;
export type Callback = (error: Error, result: any) => void;
export type Filter = { [name: string]: any };

async function getTasks() {
  return await Task.scan().exec();
}

export default (event: Event, context: Context, callback: Callback) => {
  console.log(event.queryStringParameters);
  let filter: Filter = {};
  if (event.queryStringParameters) {
    for (let key in event.queryStringParameters) {
      filter[key] = { contains: event.queryStringParameters[key] };
    }
  }

  filter['userId'] = event.requestContext.identity.cognitoIdentityId;

  console.log("About to scan");

  Task.scan(filter)
    .exec()
    .then((data: any) => {
      callback(null, {
        statusCode: 200,
        headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ status: "OK", message: data })
      });
    })
    .catch((error: Error) => {
      callback(error, "error");
    });
};
