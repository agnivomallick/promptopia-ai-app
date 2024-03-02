import { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
    creater: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    prompt: {
        type: String,
        required: [true, "The prompt is required"]
    },
    tag: {
        type: String,
        required: [true, "The tag is required"]
    }
});

const Prompt = models.Prompt || model("Prompt", promptSchema);

export default Prompt;