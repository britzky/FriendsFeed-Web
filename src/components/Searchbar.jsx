import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useLocation } from '../context/LocationContext';

export const Searchbar = ({ onSearch, placeholder }) => {
  const [input, setInput] = useState('');
  const { clearSearch, setClearSearch } = useLocation();
  useEffect(() => {
    if (clearSearch) {
      setInput('');
      setClearSearch(false);
    }
    }, [clearSearch, setClearSearch])

  const handleSearch = async (event) => {
    event.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    };
  };

  //submit if the enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="flex items-center border-2 border-secondaryGreen rounded-md overflow-hidden bg-gray-100">
      <div className="pl-3">
        <FaSearch className="text-secondaryGreen" />
      </div>
      <input
        type="text"
        name="search"
        id="search"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full py-2 px-2 bg-gray-100 focus:outline-none border-0 focus:border-secondaryGreen focus:ring-0"
      />
    </div>
  )
}
