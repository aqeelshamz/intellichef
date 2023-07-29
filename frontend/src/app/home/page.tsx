"use client";
import React from "react";

export default function Home() {
  return (
    <div className='select-none flex flex-col justify-center items-center w-full h-full'>
      <p className='text-5xl font-semibold mb-2'>👨‍🍳 IntelliChef 🍳</p>
      <p className='text-center'>Create a new recipe or select an existing recipe to start cooking!</p>
      <div className='flex flex-wrap justify-center mt-7'>
        <div className='bg-base-300 rounded-lg p-4 hover:bg-base-200 max-w-xs m-2'>
          <p className='font-semibold text-md mb-2'>✨ AI Rewriting & Grammar Check</p>
          <p className='text-sm opacity-70'>Effortlessly enhance your writing with AI-powered rewriting and precise grammar checking.</p>
        </div>
        <div className='bg-base-300 rounded-lg p-4 hover:bg-base-200 max-w-xs m-2'>
          <p className='font-semibold text-md mb-2'>🎭 Rewrites in Custom Tones & Length</p>
          <p className='text-sm opacity-70'>Personalize your text with customizable rewrites in various tones and lengths.</p>
        </div>
        <div className='bg-base-300 rounded-lg p-4 hover:bg-base-200 max-w-xs m-2'>
          <p className='font-semibold text-md mb-2'>📝 Multiple Document Creation</p>
          <p className='text-sm opacity-70'>Seamlessly create and manage multiple documents for all your writing needs.</p>
        </div>
      </div>
      <div className='flex mt-5'>
        Press <kbd className="kbd kbd-sm mx-2">Alt</kbd> + <kbd className="kbd kbd-sm mx-2">N</kbd> to create a new document.
      </div>
    </div>
  )
}
