import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';


export const CuisineFilter = ({ onApplyFilter, onClose }) => {
  const [input, setInput] = useState('');
  const [cuisines, setCuisines] = useState([]);
  const [filteredCuisines, setFilteredCuisines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchCuisines = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://colab-test.onrender.com/get-cuisines", {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setCuisines(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCuisines();
  }, [accessToken]);

  const handleInputChange = (text) => {
    setInput(text);
    const matchedCuisines = cuisines.filter(cuisine => cuisine.name.toLowerCase().startsWith(text.toLowerCase()));
    setFilteredCuisines(matchedCuisines);
  }

  const handleSelectCuisine = (cuisine) => {
    onApplyFilter(cuisine.yelp_alias);
    onClose();
  }

  return (
    <div>
      <div>
        <FaSearch className="text-secondaryGreen" />
        <input
          type="text"
          name="search"
          id="search"
          value={input}
          onChange={e => handleInputChange(e.target.value)}
          placeholder='Start typing a cuisine...'
        />
      </div>
      <div>
        {filteredCuisines.map((cuisine, index) => (
            <p
            key={index}
            onClick={() => {
              handleSelectCuisine(cuisine);
              setInput('')
            }}
            >
              {cuisine.name}
            </p>
          ))}
      </div>
    </div>
  )
}
