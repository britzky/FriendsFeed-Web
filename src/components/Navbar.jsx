import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoRestaurantOutline } from "react-icons/io5";
import { PiHouseLineLight } from "react-icons/pi";
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { logout } = useAuth();
  return  (
    <header className="z-50 bg-white fixed top-0 w-full shadow-md">
        <nav className="container mx-auto px-6 py-3">
            <div className="flex justify-center items-center">
                <div className="flex gap-24">
                    <Link to="/home"><PiHouseLineLight  className="text-3xl" /></Link>
                    <Link to="/friend"><AiOutlineUsergroupAdd className="text-3xl" /></Link>
                    <Link to="/search"><IoRestaurantOutline  className="text-3xl" /></Link>
                </div>
            </div>
        </nav>
    </header>
  )
}
