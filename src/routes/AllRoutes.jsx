import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChooseAvatar, Friend, Home, LandingPage, Login, Register, Restaurant, Review, SearchRestaurant } from '../pages';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export const AllRoutes = () => {
  const { isLoggedIn, inRegistrationFlow } = useAuth();

  return (
    <Router>
      {isLoggedIn && !inRegistrationFlow && <Navbar />}
      <div className={`${isLoggedIn && !inRegistrationFlow ? 'pt-10' : ''}`}>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<SearchRestaurant />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
            <Route path="/review/:id" element={<Review />} />
            <Route path="/friend/" element={<Friend />} />
            <Route path="/avatar" element={<ChooseAvatar />} />
        </Routes>
      </div>
    </Router>
  )
}
