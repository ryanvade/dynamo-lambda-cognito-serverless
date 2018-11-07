import { Task } from "./Task";
import { v1 } from "uuid";

export type Event = AWSLambda.APIGatewayEvent;
export type Context = AWSLambda.Context;
export type Callback = (error: Error, result: any) => void;

export default (event: Event, context: Context, callback: Callback) => {
  let body = JSON.parse(event.body);
  let task = new Task({
    id: v1(),
    name: body.name,
    description: body.description,
    userId: event.requestContext.identity.cognitoIdentityId
  });
  task
    .save()
    .then((resp: any) => {
      console.log(resp);
      callback(null, {
        statusCode: 200,
        headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ status: "OK", message: resp })
      });
    })
    .catch((error: Error) => {
      console.error(error);
      callback(error, "error");
    });
};
