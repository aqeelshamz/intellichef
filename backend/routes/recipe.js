import express from "express";
import joi from "joi";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validate from "../middlewares/validate.js";
import Recipe from "../models/Recipe.js";

const router = express.Router();

router.get("/", validate, async (req, res) => {
    res.send((await Recipe.find({ userId: req.user._id }).select("_id recipeName")).reverse());
});

router.post("/by-id", validate, async (req, res) => {
    const schema = joi.object({
        recipeId: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        return res.send(await Recipe.findOne({ _id: data.recipeId, userId: req.user._id }));
    }
    catch (err) {
        return res.status(500).send(err);
    }

});


export default router;