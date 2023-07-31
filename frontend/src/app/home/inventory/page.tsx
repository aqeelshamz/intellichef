"use client";
import Link from "next/link";
import React from "react";

export default function Page() {
    return <div className="animate-fade-in-bottom flex flex-col w-full max-w-[50vw] max-sm:max-w-none overflow-y-auto">
        <div className="hidden max-sm:flex justify-end mb-3">
            <Link href="/home"><label className="btn btn-square" onClick={() => { }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </label></Link>
        </div>
        <p className="flex items-center font-bold text-2xl">📋 Inventory</p>
        <hr className="my-5" />
        <p className="font-semibold my-2">🍎 Ingredients</p>
        <div className="flex mb-7">
            <label htmlFor="ingredients_list_modal" className="btn mr-2">+ Add Ingredients</label>
            <label htmlFor="customingredient_modal" className="btn btn-ghost mr-2" onClick={() => { }}>+ Add Custom Ingredient</label>
        </div>
        <p className="font-semibold my-2">🍽️ Kitchen Tools</p>
        <div className="flex mb-7">
            <label htmlFor="kitchentools_list_modal" className="btn mr-2">+ Add Kitchen Tools</label>
            <label htmlFor="customkitchentool_modal" className="btn btn-ghost mr-2" onClick={() => { }}>+ Add Custom Kitchen Tool</label>
        </div>
        <div className="mt-7 flex items-center max-sm:flex-col">
            <button className={'btn btn-primary max-sm:w-full max-sm:mb-3 ' + (false ? "opacity-50" : "")} onClick={() => { }}>{false ? <span className="loading loading-spinner"></span> : ""}Save</button>
        </div>
    </div>
}