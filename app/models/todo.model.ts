import mongoose, { Schema } from "mongoose";

const todosSchema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.models.Todo || mongoose.model("Todo", todosSchema);
