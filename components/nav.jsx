import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';

const Navbar = ({ setSearchQuery,setFavClicked }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchQuery(e.target.value); // Update search query in parent component
  };

    const favClicked = () => {
    setSearchQuery(''); // Clear search query
    setSearchTerm(''); // Clear search term
    setFavClicked(true); // Set favClicked state to true
    }

  return (
    <div className='border-lime-500 bg-white h-24 w-full flex justify-between items-center px-24 py-2'>
      <div className='flex justify-between items-center gap-5'>
        <img src='/Logo.svg' onClick={()=>{window.location.reload()}} style={{cursor:"pointer"}} />
        <div className='flex'>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AiOutlineSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-7"
              placeholder="Search movies and series"
              value={searchTerm}
              onChange={handleSearchChange} // Attach onChange event handler
              required
            />
          </div>
        </div>
      </div>
      <div className='flex-end'>
      <button className='h-8 p-2 rounded-xl text-xs text-white w-32' style={{ backgroundColor: '#ff005a' }} onClick={favClicked}>
      <img src='/check-heart.svg' className='inline-block mr-2' />
      My Favorites
</button>
      </div>
    </div>
  );
};

export default Navbar;
