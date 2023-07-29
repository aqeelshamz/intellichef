import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            required: true,
        },
        recipeName: {
            type: String,
            required: true,
        },
        preparationTime: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
        },
        ingredients: {
            type: Array,
            required: true,
        },
        kitchenTools: {
            type: Array,
            required: true,
        },
        instructions: {
            type: Array,
            required: true,
        },
        nutritionInfo: {
            type: Array,
            required: false,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;