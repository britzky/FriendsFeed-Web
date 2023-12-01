import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { FaChevronDown, FaTimes } from 'react-icons/fa';


export const CuisineFilter = ({ onApplyFilter, onClose }) => {
  const [input, setInput] = useState('');
  const [cuisines, setCuisines] = useState([]);
  const [filteredCuisines, setFilteredCuisines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const toggleModal = () => {
    setShowModal(!showModal);
  }
  return (
    <>
      <button
        className="text-black bg-white hover:bg-gray-200 border-2 border-secondaryGreen focus:outline-none focus:ring-primaryGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        onClick={toggleModal}
      >
        Cuisines
        <FaChevronDown className="ml-2" aria-hidden="true" />
      </button>
      {showModal && (
      <>
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
          <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
            <div className="flex items-center border-2 border-secondaryGreen rounded-md overflow-hidden max-w-md bg-gray-100">
              <div className="flex items-center pl-3">
                <FaSearch className="text-secondaryGreen" />
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={input}
                  onChange={e => handleInputChange(e.target.value)}
                  placeholder='Start typing a cuisine...'
                  className="w-full py-2 px-2 bg-gray-100 focus:outline-none border-0 focus:border-secondaryGreen focus:ring-0"
                />
              </div>
            </div>
            <div className="mt-4">
              {filteredCuisines.map((cuisine, index) => (
                <p
                key={index}
                onClick={() => {
                  handleSelectCuisine(cuisine);
                  setInput('')
                  toggleModal()
                }}
                >
                  {cuisine.name}
                </p>
              ))}
            </div>
            <button onClick={toggleModal} className="absolute top-0 right-0 p-2">
              <FaTimes aria-hidden="true" />
            </button>
          </div>
        </div>
      </>
        )}
    </>
  )
}
