import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const NavigationHandler = () => {
    const { isLoggedIn, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
          if (isLoggedIn) {
            navigate('/home');
          } else {
            navigate('/');
          }
        }
      }, [isLoggedIn, loading, navigate]);

      if (loading) {
        return <div>Loading...</div>;
      }

  return null;
}
