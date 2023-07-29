import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import usersRouter from "./routes/users.js";
import intellichefRouter from "./routes/intellichef.js";
import recipeRouter from "./routes/recipe.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/intellichef", intellichefRouter);
app.use("/recipe", recipeRouter);

app.get("/", (req, res) => {
    res.send("IntelliChef API");
});

async function connectDB() {
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
}

connectDB();

const port = process.env.PORT || 8080;

app.listen(8080, () => {
    console.log(`Server at http://localhost:${port}`);
});