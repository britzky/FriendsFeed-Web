import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoRestaurantOutline } from "react-icons/io5";
import { PiHouseLineLight } from "react-icons/pi";

export const Navbar = () => {
  const activeClass = "text-primaryGreen text-4xl";

  return  (
    <header className="z-50 bg-white fixed top-0 w-full shadow-md">
        <nav className="container mx-auto px-6 py-3">
            <div className="flex justify-center items-center">
                <div className="flex gap-24">
                    <NavLink to="/home" className={({isActive}) => isActive ? activeClass : 'text-3xl'}><PiHouseLineLight /></NavLink>
                    <NavLink to="/friend" className={({isActive}) => isActive ? activeClass : 'text-3xl'}><AiOutlineUsergroupAdd /></NavLink>
                    <NavLink to="/search" className={({isActive}) => isActive ? activeClass : 'text-3xl'}><IoRestaurantOutline /></NavLink>
                </div>
            </div>
        </nav>
    </header>
  )
}
