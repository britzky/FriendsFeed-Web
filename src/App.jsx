import { useEffect } from 'react';
import { AllRoutes } from './routes/AllRoutes'
import { AuthProvider, useAuth } from './context/AuthContext';
import { FriendProvider } from './context/FriendContext';
import { ReviewProvider } from './context/ReviewContext';
import { LocationProvider } from './context/LocationContext';
import { RestaurantProvider } from './context/RestaurantContext';
import './App.css'

const WakeUpServer = () => {
  const { checkServerReadiness } = useAuth();
  useEffect(() => {
    checkServerReadiness();
  }, []);
  return null;
}

function App() {
  return (
    <>
    <AuthProvider>
      <FriendProvider>
        <ReviewProvider>
          <LocationProvider>
            <RestaurantProvider>
              <WakeUpServer />
              <AllRoutes />
            </RestaurantProvider>
          </LocationProvider>
        </ReviewProvider>
      </FriendProvider>
    </AuthProvider>
    </>
  )
}

export default App
