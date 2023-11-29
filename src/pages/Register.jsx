import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [error, setError] = useState(null);
  const [input, setInput] = useState({ username: '', password: '', email: '', location: '' });
  const { formData, updateFormData, setInRegistrationFlow } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setInRegistrationFlow(true);
  }, [])

  const handleInputChange = (name, value) => {
    setInput(input => ({ ...input, [name]: value }));
    updateFormData({ [name]: value });
  };

  const handleRegistration = () => {
    // Perform validation here and set errors if necessary
    console.log("Current form data", formData)
    const validationErrors = {};
    if (!formData.username) {
      validationErrors.username = "username is required";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }
    if (!formData.email) {
      validationErrors.email = "email is required";
    }
    if (!formData.location) {
      validationErrors.location = "location is required";
    }
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, you can submit the data to the Context
      setInput({ username: '', password: '', email: '', location: '' });
      navigate('/avatar');
    } else {
      // Form is not valid, update the errors state
      setError(validationErrors);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center w-full max-w-md">
        <h1 className="text-5xl my-3 font-luckiest text-center text-darkGreen">Friends Feed</h1>
        <h2 className="text-xl my-2 text-center">Discover new restaurants one friend at a time.</h2>
        <div className="flex flex-col items-center">
          <input
            className="border-2 border-primaryGreen rounded-md p-2 m-2 w-96"
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
          <p>This is how you'll appear to your friends on Friends Feed.</p>
          {error && error.username && <p className="text-red-500">{error.username}</p>}
          <input
            className="border-2 border-primaryGreen rounded-md p-2 m-2 w-96"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
          <p>Password must include: 6 to 20 characters</p>
          {error && error.password && <p className="text-red-500">{error.password}</p>}
          <input
            className="border-2 border-primaryGreen rounded-md p-2 m-2 w-96"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
          {error && error.email && <p className="text-red-500">{error.email}</p>}
          <input
            type="text"
            className="border-2 border-primaryGreen rounded-md p-2 m-2 w-96"
            name="location"
            placeholder="Location"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
          <p className="text-center">Enter your city and state so we can start showing you recommendations nearby.</p>
          {error && error.location && <p className="text-red-500">{error.location}</p>}
          <button
            className="px-4 py-2 bg-primaryGreen text-white rounded-md hover:bg-secondaryGreen mt-10 w-96"
            onClick={handleRegistration}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
