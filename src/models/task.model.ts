import { Schema, model, Document} from "mongoose"

interface ITask extends Document {
  title: string,
  description: string,
  deadline: Date,
  publishedBy: string,
  createdAt: Date;
  updatedAt: Date;
}

const taskShema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  publishedBy: { type: String, ref: "User" },
  },
  {timestamps: true}
)

const Task = model("Task", taskShema)

export default Task;