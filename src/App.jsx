import { AllRoutes } from './routes/AllRoutes'
import { AuthProvider } from './context/AuthContext';
import { FriendProvider } from './context/FriendContext';
import { ReviewProvider } from './context/ReviewContext';
import { LocationProvider } from './context/LocationContext';
import { RestaurantProvider } from './context/RestaurantContext';
import './App.css'

function App() {

  return (
    <>
    <AuthProvider>
      <FriendProvider>
        <ReviewProvider>
          <LocationProvider>
            <RestaurantProvider>
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
