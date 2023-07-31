"use client";
import Link from "next/link";
import React, { useRef, useState } from "react"
import { ingredients, kitchenTools, serverURL } from "../../../utils/utils";
import { FiCheck, FiTrash, FiX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Page() {
    const [selectedIngredients, setSelectedIngredients] = useState<any>([])
    const [selectedKitchenTools, setSelectedKitchenTools] = useState<any>([])
    const [searchKeywordIngredients, setSearchKeywordIngredients] = useState<string>("")
    const [generatingRecipes, setGeneratingRecipes] = useState<boolean>(false);
    const [recipeSuggestions, setRecipeSuggestions] = useState([]);
    const recipeSuggestionsModalRef = useRef<null | any | HTMLLabelElement>(null);
    const [time, setTime] = useState<string>("5");

    const [customIngredientName, setCustomIngredientName] = useState<string>("")
    const [customKitchenToolName, setCustomKitchenToolName] = useState<string>("")

    const suggestRecipes = async () => {
        if (selectedIngredients.length === 0 || selectedKitchenTools.length === 0 || generatingRecipes) return;

        setGeneratingRecipes(true);
        const config = {
            method: "POST",
            url: `${serverURL}/intellichef/suggest-recipes`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `application/json`,
            },
            data: {
                ingredients: selectedIngredients,
                kitchenTools: selectedKitchenTools,
                time: time
            }
        };

        axios(config)
            .then((response) => {
                setGeneratingRecipes(false);
                console.log(response.data)
                setRecipeSuggestions(response.data);
                recipeSuggestionsModalRef.current.click();
            })
            .catch((error) => {
                setGeneratingRecipes(false);
                toast.error("Something went wrong!");
            });
    }

    const generateRecipe = async (recipeName: string) => {
        if (selectedIngredients.length === 0 || selectedKitchenTools.length === 0 || generatingRecipes) return;

        setGeneratingRecipes(true);
        const config = {
            method: "POST",
            url: `${serverURL}/intellichef/generate-recipe`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `application/json`,
            },
            data: {
                recipeName: recipeName,
                ingredients: selectedIngredients,
                kitchenTools: selectedKitchenTools,
                time: time
            }
        };

        axios(config)
            .then((response) => {
                setGeneratingRecipes(false);
                console.log(response.data);
                window.location.href = `/home/recipe/${response.data._id}`;
            })
            .catch((error) => {
                setGeneratingRecipes(false);
                toast.error("Something went wrong!");
            });
    }

    return <div className="animate-fade-in-bottom flex flex-col w-full max-w-[50vw] max-sm:max-w-none overflow-y-auto">
        <div className="hidden max-sm:flex justify-end mb-3">
            <Link href="/home"><label className="btn btn-square" onClick={() => { }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </label></Link>
        </div>
        <p className="flex items-center font-bold text-2xl">🍳 New Recipe</p>
        <hr className="my-5" />
        <div className="flex flex-col mb-7 max-sm:flex-wrap">
            <p className="mr-2 font-semibold mb-2">What ingredients do you have?</p>
            <div className="flex my-2 flex-wrap">
                {
                    selectedIngredients.map((x: any) => {
                        return <label className="btn btn-outline btn-sm mr-2 mb-2">
                            <p className="mr-1">{x}</p>
                            <FiX className="cursor-pointer" onClick={() => {
                                setSelectedIngredients(selectedIngredients.filter((y: any) => y !== x))
                            }} />
                        </label>
                    })
                }
            </div>
            <div className="flex">
                <label htmlFor="ingredients_list_modal" className="btn mr-2">+ Add Ingredients</label>
                <label htmlFor="customingredient_modal" className="btn btn-ghost mr-2" onClick={() => setCustomIngredientName("")}>+ Add Custom Ingredient</label>
            </div>
        </div>
        <div className="flex flex-col mb-7 max-sm:flex-wrap">
            <p className="mr-2 font-semibold mb-2">What kitchen tools do you have?</p>
            {/* <div className="flex">
                <label className="btn btn-primary mr-2">🍽️ Kitchen Tools List</label>
                <label className="btn">📋 Your Inventory</label>
            </div> */}
            <div className="flex my-2 flex-wrap">
                {
                    selectedKitchenTools.map((x: any) => {
                        return <label className="btn btn-outline btn-sm mr-2 mb-2">
                            <p className="mr-1">{x}</p>
                            <FiX className="cursor-pointer" onClick={() => {
                                setSelectedKitchenTools(selectedKitchenTools.filter((y: any) => y !== x))
                            }} />
                        </label>
                    })
                }
            </div>
            <div className="flex">
                <label htmlFor="kitchentools_list_modal" className="btn mr-2">+ Add Kitchen Tools</label>
                <label htmlFor="customkitchentool_modal" className="btn btn-ghost mr-2" onClick={() => setCustomKitchenToolName("")}>+ Add Custom Kitchen Tool</label>
            </div>
        </div>
        <div className="flex flex-col mb-7 max-sm:flex-wrap">
            <p className="mr-2 font-semibold mb-2">How much time do you have?</p>
            <div className="flex flex-wrap">
                {
                    ["5", "10", "15", "30", "45", "60", "120", "120+"].map((x: any) => {
                        return <label className={"btn mr-2 mb-2 " + (time === x ? "btn-primary" : "")} onClick={() => setTime(x)}>{x} minutes</label>
                    })
                }
            </div>
        </div>
        <div className="mt-7 flex items-center max-sm:flex-col">
            <button className={'btn btn-primary max-sm:w-full max-sm:mb-3 ' + (selectedIngredients.length === 0 || selectedKitchenTools.length === 0 || generatingRecipes ? "opacity-50" : "")} onClick={() => suggestRecipes()}>{generatingRecipes ? <span className="loading loading-spinner"></span> : ""}Generate Recipes 🍳</button>
        </div>
        {/* Ingredients List Modal */}
        <input type="checkbox" id="ingredients_list_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box overflow-hidden">
                <h3 className="font-bold text-lg">🍎 Ingredients</h3>
                <div className="flex mt-4">
                    <label className="btn btn-md btn-primary mr-2">🍎 Ingredients List</label>
                    <label className="btn btn-md">📋 Your Inventory</label>
                </div>
                <input type="text" className="input input-bordered my-4 w-full" placeholder="Search..." onChange={(x) => setSearchKeywordIngredients(x.target.value)} value={searchKeywordIngredients} />
                <div className="max-h-[50vh] h-full overflow-y-auto">
                    {
                        Object.keys(ingredients).map((x, i) => {
                            return <div key={i} className="flex flex-col">
                                {searchKeywordIngredients.length !== 0 ? "" : <p className="uppercase font-semibold my-2 text-gray-400">{x} ({ingredients[x].length})</p>}
                                {
                                    ingredients[x].map((y: string, j: number) => {
                                        return (searchKeywordIngredients !== "" && !y.toString().toLowerCase().includes(searchKeywordIngredients.toLowerCase())) ? "" : <label key={j} className={`mb-1 flex justify-between btn w-full ${(selectedIngredients.includes(y) ? "btn-primary" : "btn-ghost")}`} onClick={() => {
                                            if (selectedIngredients.includes(y)) {
                                                setSelectedIngredients(selectedIngredients.filter((z: string) => { return z !== y }))
                                            } else {
                                                setSelectedIngredients([...selectedIngredients, y])
                                            }
                                        }}>{y}{selectedIngredients.includes(y) ? <FiCheck /> : ""}</label>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
                <div className="modal-action">
                    <label htmlFor="ingredients_list_modal" className="btn">Close</label>
                </div>
            </div>
            <label className="modal-backdrop" htmlFor="ingredients_list_modal">Close</label>
        </div>
        {/* Kitchen Tools List Modal */}
        <input type="checkbox" id="kitchentools_list_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box overflow-hidden">
                <h3 className="font-bold text-lg">🍽️ Kitchen Tools</h3>
                <div className="flex mt-4">
                    <label className="btn btn-md btn-primary mr-2">🍽️ Kitchen Tools List</label>
                    <label className="btn btn-md">📋 Your Inventory</label>
                </div>
                <input type="text" className="input input-bordered my-4 w-full" placeholder="Search..." onChange={(x) => setSearchKeywordIngredients(x.target.value)} value={searchKeywordIngredients} />
                <div className="mt-2 max-h-[50vh] h-full overflow-y-auto">
                    {
                        kitchenTools.map((x, i) => {
                            return <label key={i} className={`mb-1 flex justify-between btn w-full ${(selectedKitchenTools.includes(x) ? "btn-primary" : "btn-ghost")}`} onClick={() => {
                                if (selectedKitchenTools.includes(x)) {
                                    setSelectedKitchenTools(selectedKitchenTools.filter((z: string) => { return z !== x }))
                                } else {
                                    setSelectedKitchenTools([...selectedKitchenTools, x])
                                }
                            }}>{x}{selectedKitchenTools.includes(x) ? <FiCheck /> : ""}</label>
                        })
                    }
                </div>
                <div className="modal-action">
                    <label htmlFor="kitchentools_list_modal" className="btn">Close</label>
                </div>
            </div>
            <label className="modal-backdrop" htmlFor="kitchentools_list_modal">Close</label>
        </div>
        {/* Custom Inrgedient Modal */}
        <input type="checkbox" id="customingredient_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="flex items-center font-bold text-lg mb-4">🍎 Add Custom Ingredient</h3>
                <input className="input input-bordered w-full" placeholder="Ingredient name" type="text" onChange={(x) => setCustomIngredientName(x.target.value)} value={customIngredientName} />
                <div className="modal-action">
                    <label htmlFor="customingredient_modal" className="btn">Cancel</label>
                    <label htmlFor="customingredient_modal" className="btn btn-primary" onClick={() => setSelectedIngredients([...selectedIngredients, customIngredientName])}>Add</label>
                </div>
            </div>
            <label className="modal-backdrop" htmlFor="customingredient_modal">Cancel</label>
        </div>
        {/* Custom KitchenTool Modal */}
        <input type="checkbox" id="customkitchentool_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="flex items-center font-bold text-lg mb-4">🍽️ Add Custom Kitchen Tool</h3>
                <input className="input input-bordered w-full" placeholder="Kitchen tool name" type="text" onChange={(x) => setCustomKitchenToolName(x.target.value)} value={customKitchenToolName} />
                <div className="modal-action">
                    <label htmlFor="customkitchentool_modal" className="btn">Cancel</label>
                    <label htmlFor="customkitchentool_modal" className="btn btn-primary" onClick={() => setSelectedKitchenTools([...selectedKitchenTools, customKitchenToolName])}>Add</label>
                </div>
            </div>
            <label className="modal-backdrop" htmlFor="customkitchentool_modal">Cancel</label>
        </div>
        {/* Recipe Suggestions Modal */}
        <input type="checkbox" id="recipe_suggestions_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box overflow-hidden">
                <h3 className="font-bold text-lg">🍽️ Recipe Suggestions</h3>
                <div className="mt-4 max-h-[50vh] h-full overflow-y-auto">
                    {
                        recipeSuggestions.map((x, i) => {
                            return <label htmlFor="recipe_suggestions_modal" className="mb-1 flex justify-between btn btn-ghost normal-case w-full text-lg" onClick={() => generateRecipe(x)}>{x}</label>
                        })
                    }
                </div>
                <div className="modal-action">
                    <label ref={recipeSuggestionsModalRef} htmlFor="recipe_suggestions_modal" className="btn">Close</label>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>
}