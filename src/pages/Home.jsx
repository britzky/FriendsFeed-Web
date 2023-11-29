import React from 'react'
import { useAuth } from '../context/AuthContext'

export const Home = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <div>
    <button
      className="px-4 py-2 bg-primaryGreen text-white rounded-md hover:bg-secondaryGreen mt-10 w-96"
      onClick={handleLogout}
    >
      Logout
    </button>
    </div>
  )
}
