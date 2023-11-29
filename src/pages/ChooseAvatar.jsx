import { useState, useEffect } from 'react';
import { avatars } from '../assets/avatars';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
      setLoading(false);
      return;
    }
    setLoading(true);
      updateFormData({ ...formData, profile_picture: selectedAvatar });

    setTimeout(async () => {
      try {
        await registerUser(formData);
        navigate('/friend');
      } catch (error) {
        console.error("Error completing registration:", error);
      } finally {
        setLoading(false);
      }
    }, 0);
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
          <button className="px-4 py-2 border-2 rounded-md text-primaryGreen border-primaryGreen hover:border-secondaryGreen w-80">Copy Invite Link</button>

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
