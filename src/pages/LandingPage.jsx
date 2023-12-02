import React from 'react'
import backgroundImage from '../assets/landing_page.jpeg'
import { Link } from 'react-router-dom'

export const LandingPage = () => {
  return (
    <div className="relative w-full h-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/50"></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="flex flex-col items-center max-w-md">
          <h1 className="text-5xl font-luckiest text-center text-darkGreen mb-12">Friends Feed</h1>
          <h2 className="text-2xl text-center text-gray-800">Discover new restaurants one friend at a time.</h2>
            <Link to="/register" className="px-4 py-2 text-center w-full bg-primaryGreen text-white rounded-md hover:bg-secondaryGreen mt-10 mb-8">Sign Up</Link>
            <div className="flex">
              <p className="mr-1 text-xl">Already have an account?</p>
              <Link to="/login" className="font-bold text-xl">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
