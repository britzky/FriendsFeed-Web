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
    <div>
      <FaSearch />
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
