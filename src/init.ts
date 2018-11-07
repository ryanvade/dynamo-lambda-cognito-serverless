import { local, AWS } from "dynamoose";

export default function init() {
  if (process.env.IS_OFFLINE) {
    local("http://localhost:8000");
  } else {
    AWS.config.update({
      region: "us-east-1"
    });
  }
}
