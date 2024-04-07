import mongoose from "mongoose";

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  preparationTime: {
    type: String,
    required: true,
  },
  servings: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  cusineType: {
    type: String,
    required: true
  },
  foodType: {
    type: String,
    required: true
  },
  ingredients: [
    {
      value: String,
    },
  ],
  description: [
    {
      value: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

export default mongoose.models.recipes ??
  mongoose.model("recipes", recipeSchema);
