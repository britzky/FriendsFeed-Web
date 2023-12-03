import { useState } from 'react';
import { avatars } from '../assets/avatars';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CiLock } from "react-icons/ci";

export const ChooseAvatar = () => {
  const { formData, updateFormData, registerUser, setUserDetails, setAccessToken } = useAuth();
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
  }

  const handleCompleteRegistration = async () => {
    if (!selectedAvatar) {
      alert('Please select an avatar');
      return;
    }
    setLoading(true);

    const updatedFormData = { ...formData, profile_picture: selectedAvatar };

    setTimeout(async () => {
      try {
        await registerUser(updatedFormData);
        navigate('/friend');
      } catch (error) {
        console.error("Error completing registration:", error);
      } finally {
        setLoading(false);
      }
    }, 0);
  }

  const copyToClipboard = () => {
    if (!navigator.clipboard) {
      console.error("Clipboard API not available");
      return;
    }
    try {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy!", error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center w-full max-w-md">
      <h1 className="text-5xl font-luckiest text-center text-darkGreen">Friends Feed</h1>
      <p className="text-center my-7">Pick an avatar for your Friends Feed profile.</p>
      <div className="flex gap-5 flex-wrap w-80">
        {Object.keys(avatars).map((key) => (
          <div key={key}>
            <img
              src={avatars[key]}
              alt={key}
              className={`h-16 w-16 rounded-full cursor-pointer ${selectedAvatar === key ? 'ring-4 ring-primaryGreen' : ''}`}
              onClick={() => handleSelectAvatar(key)}
            />
          </div>
        ))}
        <p>Invite 10 friends to Friends Feed to unlock these special Avatars!</p>
        <div>
          <button
            onClick={() => copyToClipboard("friendsfeed.netlify.app")}
            className="px-4 py-2 border-2 rounded-md text-primaryGreen border-primaryGreen hover:border-secondaryGreen w-80"
          >
            Copy Invite Link
          </button>
        </div>
        <div className="w-full flex justify-center items-center gap-5">
          <div className="relative">
              <img
                src={avatars['Coffee']}
                alt={'Coffee avatar'}
                className="h-16 w-16 rounded-full cursor-pointer blur"
                />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <CiLock className="h-10 w-10 rounded-full cursor-pointer" />
            </div>
          </div>
            <div className="relative">
              <img
                src={avatars['Cupcake']}
                alt={'Cupcake avatar'}
                className="h-16 w-16 rounded-full cursor-pointer blur"
              />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <CiLock className="h-10 w-10 rounded-full cursor-pointer" />
            </div>
            </div>
            <div className="relative">
              <img
                src={avatars['Hamburger']}
                alt={'Hamburger avatar'}
                className="h-16 w-16 rounded-full cursor-pointer blur"
              />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <CiLock className="h-10 w-10 rounded-full cursor-pointer" />
            </div>
          </div>
        </div>
        <button
            className="px-4 py-2 bg-primaryGreen text-white rounded-md hover:bg-secondaryGreen mt-10 w-80"
            onClick={handleCompleteRegistration}
            disabled={loading}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
