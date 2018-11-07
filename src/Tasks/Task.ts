import { Schema, model } from "dynamoose";
import init from "../init";

init();

const taskSchema = new Schema(
  {
    id: { type: String, hashKey: true },
    name: { type: String },
    description: { type: String },
    userId: { type: String }
  },
  {
    useDocumentTypes: true
  }
);

export const Task = model("Task", taskSchema);
