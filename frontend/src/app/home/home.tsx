"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { FiPlus, FiUser, FiMoreHorizontal, FiSettings, FiLogOut, FiClock } from "react-icons/fi";
import Link from 'next/link';
import axios from "axios";
import { serverURL } from "../../utils/utils";

export default function Home({
  children,
}: {
  children: React.ReactNode
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [recipes, setRecipes] = useState<any>([]);

  const getRecipes = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/recipe`,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        setRecipes(response.data);
      })
  }

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <main className="flex bg-base-100 h-screen w-screen p-2 max-sm:p-0">
      {/* Sidebar */}
      <div className={'flex flex-col p-5 min-w-[275px] max-w-[15vw] h-full rounded-md ' + (!showMenu ? "max-sm:hidden " : "max-sm:fixed max-sm:w-full max-sm:h-full max-sm:max-w-none bg-base-100 max-sm:z-50 ")}>
        <div className="flex justify-between items-center max-sm:mb-4">
          <Link href="/home"><p className="mb-5 font-semibold max-sm:mb-3">👨‍🍳 IntelliChef 🍳</p></Link>
          <div className="hidden max-sm:flex justify-end mb-3">
            <label className="btn btn-square btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </label>
          </div>
        </div>
        <Link href="/home/new"><label className='btn btn-primary w-full' htmlFor='newdocument_modal'><FiPlus /> NEW RECIPE</label></Link>
        <Link href="/home/inventory"><label className='btn mt-2 w-full' htmlFor='inventory_modal'>📋 INVENTORY</label></Link>
        <p className="flex items-center mt-4 mb-2 font-semibold"><FiClock className="mr-1" /> Recipe History</p>
        <div className='p-0 mb-2 h-full w-full overflow-hidden hover:overflow-y-auto'>
          {
            recipes.map((recipe: any) => {
              return (
                <Link href={`/home/recipe/${recipe._id}`} key={recipe._id}>
                  <div className='btn text-left justify-start normal-case w-full mb-2'>
                    <p className="font-semibold">{recipe.recipeName}</p>
                  </div>
                </Link>
              )
            })
          }
        </div>
        <hr />
        <div tabIndex={0} className='cursor-pointer dropdown dropdown-top flex items-center mt-2 hover:bg-base-200 p-2 rounded-lg'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center'>
              <div className="avatar placeholder mr-2">
                <div className="bg-blue-700 text-white mask mask-squircle w-10">
                  <span><FiUser /></span>
                </div>
              </div>
              <p className='font-semibold'>User</p>
            </div>
            <FiMoreHorizontal />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mb-2">
            <label htmlFor='settings_modal'><li className='flex'><p><FiSettings />Settings</p></li></label>
            <hr className='my-2' />
            <li className='flex' onClick={() => {
              localStorage.clear()
              window.location.href = "/login";
            }}><p><FiLogOut className="text-red-600" />Logout</p></li>
          </ul>
        </div>
      </div>
      {/* Main */}
      <div className='flex flex-col items-center justify-center ml-2 p-5 border-base-300 border-[1px] w-full h-full rounded-lg 2xl:items-center max-sm:ml-0 max-sm:border-none max-sm:p-2 max-sm:items-start max-sm:justify-start'>
        {children}
      </div>
      <Link href="/home/new"><label className='sm:hidden absolute right-5 bottom-5 btn btn-primary btn-square'><FiPlus /></label></Link>
    </main>
  )
}
