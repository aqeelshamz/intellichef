"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { serverURL } from "../../../../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiClock, FiCopy, FiStar, FiTrash, FiZap } from "react-icons/fi";

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

    const deleteRecipe = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/recipe/delete`,
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
                toast.success("Recipe deleted!");
                window.location.href = "/home/";
            })
            .catch((error) => {
                toast.error("Failed to delete recipe");
            });
    }

    useEffect(() => {
        getRecipe();
    }, []);

    return <div className="animate-fade-in-bottom flex flex-col w-full h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
            <p className="flex items-center font-bold text-2xl">{recipe?.recipeName}<FiCopy className="cursor-pointer ml-4" onClick={() => {
                var data = `*${recipe?.recipeName}*\n\n*⌚ Preperation Time:*\n${recipe?.preparationTime}\n\n*⚡ Difficulty:* ${recipe?.difficulty}\n\n*📝 Ingredients:*\n${recipe?.ingredients.join("\n")}\n\n*🍽️ Kitchen Tools:*\n${recipe?.kitchenTools.join("\n")}\n\n*📃 Instructions:*\n${recipe?.instructions.join("\n")}\n\n*🍎 Nutrition Info:*\n${recipe?.nutritionInfo.join("\n")}\n\n[IntelliChef]`;
                navigator.clipboard.writeText(data);
                toast.success("Copied to clipboard!");
            }} /></p>
            <div className="flex">
                <label htmlFor="deleterecipe_modal" className="btn btn-sm mr-2"><FiTrash className="mr-1" />Delete</label>
            </div>
        </div>
        <hr />
        <p className="flex items-center font-semibold text-lg my-4"><FiClock className="mr-2" /> {recipe?.preparationTime}</p>
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
        {/* Delete Recipe Modal */}
        <input type="checkbox" id="deleterecipe_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="flex items-center font-bold text-lg"><FiTrash className="mr-1" /> Delete Recipe</h3>
                <p className="py-4">Are you sure want to delete this recipe?</p>
                <div className="modal-action">
                    <label htmlFor="deleterecipe_modal" className="btn">Cancel</label>
                    <label htmlFor="deleterecipe_modal" className="btn btn-error" onClick={() => deleteRecipe()}>Delete</label>
                </div>
            </div>
            <label className="modal-backdrop" htmlFor="deleterecipe_modal">Cancel</label>
        </div>
        <ToastContainer />
    </div>
}