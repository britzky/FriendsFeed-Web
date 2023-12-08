import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

export const Login = () => {
  const navigate = useNavigate();
  const { loginUser, loading, setInRegistrationFlow } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // set local state when the user types in the input fields
  const handleChange = (event, type) => {
    const value = event.target.value;
    if (type === 'username') setUsername(value);
    if (type === 'password') setPassword(value);
  }

  // handle login form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
    try {
      setUsername('');
      setPassword('');
      console.log("Calling loginUser: ", username, password)
      await loginUser(username, password);
      setInRegistrationFlow(false);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="flex justify-center h-screen w-full mt-14">
      <div className="flex-col justify-center items-center max-w-md">
        <div className="my-12">
          <h1 className="text-5xl font-luckiest text-center text-darkGreen mb-5">Friends Feed</h1>
          <h2 className="text-3xl font-semibold text-center text-gray-800">Discover new restaurants one friend at a time.</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-7"
        >
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => handleChange(e, 'username')}
              className="border-2 border-primaryGreen rounded-md p-2 m-2"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handleChange(e, 'password')}
              className="border-2 border-primaryGreen rounded-md p-2 m-2"
            />
              {error && <div className="text-red-500 text-center mb-3">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primaryGreen text-white rounded-md hover:bg-secondaryGreen mx-2 md:mx-0"
            >
              Login
            </button>
        </form>
      </div>
    </div>
  )
}
