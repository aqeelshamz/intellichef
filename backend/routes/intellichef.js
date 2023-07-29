import express from "express";
import joi from "joi";
import { recipePrompt, recipiesPrompt } from "../utils/utils.js";
import { Configuration, OpenAIApi } from "openai";
import validate from "../middlewares/validate.js";
import Recipe from "../models/Recipe.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("IntelliChef");
});

router.post("/suggest-recipes", validate, async (req, res) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const schema = joi.object({
        ingredients: joi.array().items(joi.string().min(1).required()).required(),
        kitchenTools: joi.array().items(joi.string().min(1).required()).required(),
        time: joi.string().min(1).required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": recipiesPrompt },
                { "role": "user", "content": `{\"ingredients\": ${JSON.stringify(data.ingredients)}, \"kitchenTools\": ${JSON.stringify(data.kitchenTools)}, \"time\": \"Less than ${data.time} minutes\"}` }
            ],
        });

        return res.send(JSON.parse(completion.data.choices[0].message.content));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/generate-recipe", validate, async (req, res) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const schema = joi.object({
        recipeName: joi.string().min(1).required(),
        ingredients: joi.array().items(joi.string().min(1).required()).required(),
        kitchenTools: joi.array().items(joi.string().min(1).required()).required(),
        time: joi.string().min(1).required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": recipePrompt },
                { "role": "user", "content": `{\"recipeName\": \"${data.recipeName}\", \"ingredients\": ${JSON.stringify(data.ingredients)}, \"kitchenTools\": ${JSON.stringify(data.kitchenTools)}, \"time\": \"Less than ${data.time} minutes\"}` }
            ],
        });

        const recipe = JSON.parse(completion.data.choices[0].message.content);
        const newRecipe = new Recipe({
            userId: req.user._id,
            recipeName: recipe.recipeName,
            preparationTime: recipe.preparationTime,
            difficulty: recipe.difficulty,
            ingredients: recipe.ingredients,
            kitchenTools: recipe.kitchenTools,
            instructions: recipe.instructions,
            nutritionInfo: recipe.nutritionInfo,
        });

        return res.send(await newRecipe.save());
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
});

export default router;