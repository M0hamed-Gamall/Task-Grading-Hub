import { Schema, model, Document} from "mongoose"

interface ITask extends Document {
  title: string,
  description: string,
  deadline: Date,
  publishedBy: Schema.Types.ObjectId,
  createdAt: Date;
  updatedAt: Date;
}

const taskShema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  publishedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {timestamps: true}
)

taskShema.pre(/^find/, function (this: ITask, next) {
  this.populate("publishedBy");
  next();
});

const Task = model("Task", taskShema)

export default Task;