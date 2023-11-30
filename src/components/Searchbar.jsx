import { useState } from 'react'
import { FaSearch } from 'react-icons/fa';

export const Searchbar = ({ onSearch, placeholder }) => {
  const [input, setInput] = useState('');

  const handleSearch = (event) => {
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
    <div className="flex items-center border-2 border-secondaryGreen rounded-md overflow-hidden max-w-md bg-gray-100">
      <div className="pl-3 ">
        <FaSearch className="text-secondaryGreen" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full max-w-md py-2 px-2 bg-gray-100 focus:outline-none"
      />
    </div>
  )
}
