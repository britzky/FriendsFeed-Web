import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const NavigationHandler = () => {
    const { isLoggedIn, loading, inRegistrationFlow } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!loading) {
            if (!isLoggedIn && !inRegistrationFlow && location.pathname !== '/') {
                // If not logged in and not in registration flow, redirect to '/'
                navigate('/');
            } else if (isLoggedIn && location.pathname === '/') {
                // If logged in and on '/', redirect to '/home'
                navigate('/home');
            }
            // No redirection if the user is in the registration flow or already logged in
        }
    }, [isLoggedIn, loading, inRegistrationFlow, navigate, location.pathname]);


      if (loading) {
        return
      }

  return null;
}
