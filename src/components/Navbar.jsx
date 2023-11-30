import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return  (
    <header className="fixed top-0 w-full shadow-md">
        <nav class="container mx-auto px-6 py-3">
            <div class="flex justify-center items-center">
                <div class="flex gap-24">
                    <Link to="/home">Home</Link>
                    <Link to="/friend">Friend</Link>
                    <Link to="/search">Search Restaurant</Link>
                </div>
            </div>
        </nav>
    </header>
  )
}
