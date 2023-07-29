"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { serverURL } from "../../../../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiClock, FiStar, FiZap } from "react-icons/fi";

type Params = {
    params: {
        recipeId: string
    }
}

export default function Page({ params: { recipeId } }: Params) {
    const [recipe, setRecipe] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    const getRecipe = async () => {
        setLoading(true);
        const config = {
            method: "POST",
            url: `${serverURL}/recipe/by-id`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `application/json`,
            },
            data: {
                recipeId: recipeId
            }
        };

        axios(config)
            .then((response) => {
                setLoading(false);
                console.log(response.data);
                setRecipe(response.data);
            })
            .catch((error) => {
                setLoading(false);
                toast.error("Something went wrong!");
            });
    }

    useEffect(() => {
        getRecipe();
    }, []);

    return <div className="animate-fade-in-bottom flex flex-col w-full h-full overflow-y-auto">
        <p className="font-bold text-2xl mb-4">{recipe?.recipeName}</p>
        <p className="flex items-center font-semibold text-lg mb-2"><FiClock className="mr-2" /> {recipe?.preparationTime}</p>
        <p className="flex items-center font-semibold text-lg normal-case"><FiZap className="mr-2" />Difficulty: {recipe?.difficulty}</p>
        <p className="flex items-center font-semibold text-lg normal-case mt-7 mb-2">Ingredients:</p>
        <ul className="ml-4">
            {
                recipe?.ingredients.map((ingredient: any) => {
                    return <li className="mb-1 text-lg font-medium">{ingredient}</li>
                })
            }
        </ul>
        <p className="flex items-center font-semibold text-lg normal-case mt-7 mb-2">Kitchen Tools:</p>
        <ul className="ml-4">
            {
                recipe?.kitchenTools.map((kitchenTool: any) => {
                    return <li className="mb-1 text-lg font-medium">{kitchenTool}</li>
                })
            }
        </ul>
        <p className="flex items-center font-semibold text-lg normal-case mt-7 mb-2">Instructions:</p>
        <ul className="ml-4">
            {
                recipe?.instructions.map((instruction: any) => {
                    return <li className="mb-1 text-lg font-medium">{instruction}</li>
                })
            }
        </ul>
        <p className="flex items-center font-semibold text-lg normal-case mt-7 mb-2">Nutrition Info:</p>
        <ul className="ml-4">
            {
                recipe?.nutritionInfo.map((info: any) => {
                    return <li className="mb-1 text-lg font-medium">{info}</li>
                })
            }
        </ul>
        <ToastContainer />
    </div>
}