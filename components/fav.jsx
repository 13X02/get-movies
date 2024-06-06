'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import MovieCard from "@/components/moviecard";
import Navbar from "@/components/nav";
import { AiOutlineSearch, AiOutlineArrowLeft, AiOutlineCloseCircle } from 'react-icons/ai';
import Link from "next/link";

const LikedMovies = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
  
    // Function to handle search input change
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      if(e.target.value === ''){
        setSearchClicked(false);
      }else{
        setSearchClicked(true);
      }
    };

    // Function to clear the search input
    const clearSearch = () => {
      setSearchTerm('');
    };

    const [likedMovies, setLikedMovies] = useState([]);

    const fetchLikedMovies = () => {
        const likedMoviesFromStorage = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const movieData = JSON.parse(localStorage.getItem(key));
            if (movieData && movieData.liked) {
                likedMoviesFromStorage.push(movieData);
            }
        }
        setLikedMovies(likedMoviesFromStorage);
    };

    useEffect(() => {
        // Initial fetch of liked movies
        fetchLikedMovies();

        // Event listener for storage changes
        


        // Cleanup event listener on component unmount
       
    }, []);

    window.addEventListener('storage', () => {
        console.log("Change to local storage!");
        fetchLikedMovies();
        // ...
    })


    const filteredMovies = likedMovies.filter(movie => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const goBack = () => {
        window.location.reload();
    }

    return (
        <div>
            <div className="flex justify-between p-5">
                <div className="flex gap-5 items-center">
                    <button onClick={goBack}>
                            <AiOutlineArrowLeft className="w-6 h-6" />
                    </button>
                    <h1>My Favourites</h1>
                </div>
                <div className='flex'>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <AiOutlineSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-54 p-4 pl-10 text-sm text-black border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500   h-7"
                            placeholder="Search from favourites"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            required
                        />
                        {searchTerm && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={clearSearch}>
                                <AiOutlineCloseCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="px-4 py-8">
                {searchClicked?(<><p>{filteredMovies.length} Result found</p></>):(<></>)}
                <div className="grid grid-cols-4 gap-6 px-32">
                    {filteredMovies.map((movie, index) => (
                        <MovieCard 
                            key={index}
                            title={movie.title}
                            genre={movie.genre}
                            year={movie.year}
                            image={movie.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LikedMovies;

