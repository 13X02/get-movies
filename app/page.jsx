'use client'
import Image from "next/image";
import Navbar from "../components/nav";
import Slider from "../components/slider";
import MovieCard from "../components/moviecard";
import React, { useState, useEffect } from 'react';
import LikedMovies from "@/components/fav";

const seriesData = [
  {
    title: "One Piece Live Action",
    url: "https://w0.peakpx.com/wallpaper/406/359/HD-wallpaper-netflix-one-piece-2023-one-piece-tv-shows-netflix.jpg", // Example URL
    description: "The live-action adaptation of the popular manga and anime series 'One Piece', following the adventures of Monkey D. Luffy and his pirate crew as they search for the ultimate treasure known as 'One Piece'.",
    link: "https://www.youtube.com/watch?v=lNMSqxQtO0w"
  },
  {
    title: "Dark",
    url: "https://wallpapers.com/images/hd/dark-netflix-y4od003545gol7q3.jpg", // Example URL
    description: "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.",
    link: "https://www.youtube.com/watch?v=rrwycJ08PSA"
  },
  {
    title: "The Walking Dead",
    url: "https://i.pinimg.com/originals/0f/eb/22/0feb223e171e50694a4f15a281d89109.jpg", // Example URL
    description: "Sheriff Deputy Rick Grimes wakes up from a coma to learn the world is in ruins, and must lead a group of survivors to stay alive.",
    link: "https://www.youtube.com/watch?v=R1v0uFms68U"
  },
  {
    title: "The Office",
    url: "https://w.forfun.com/fetch/f8/f8878926a6817993ca07390b3e7889bc.jpeg", // Example URL
    description: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
    link: "https://www.youtube.com/watch?v=SzB6K9XHLNQ"
  }
];




export default function Home() {


  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [favClicked, setFavClicked] = useState(false);


  useEffect(() => {
    const fetchMovies = async () => {
      fetch('https://movie-backend-ll6b.onrender.com/api/movies/').then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch movies');
        }
        return res.json();
      })
        .then((data) => {
          setMovies(data);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });

    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const searchMovies = async () => {

      if (searchQuery.length > 0) {
        setFavClicked(false);
        setIsSearching(true);
        fetch(`https://movie-backend-ll6b.onrender.com/api/movies/search?title=${searchQuery}`).then((res) => {
          if (!res.ok) {
            throw new Error('Failed to search movies');
          }
          return res.json();
        })
          .then((data) => {
            setMovies(data.data);
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
          });
      } else {
        setIsSearching(false);
      }
    };
    searchMovies();
  }, [searchQuery]);

  return (

      <main className="flex min-h-screen flex-col font-sans">
        <Navbar setSearchQuery={setSearchQuery} setFavClicked={setFavClicked} />

        {favClicked ? (<>
        <LikedMovies setFavClicked={setFavClicked}/>
        </>) : (<>

          <div className="px-32 bg-gray-100 py-12">
          {isSearching ? (
            <>
              <h1 className="text-4xl font-bold mb-20">Search</h1>
              <p className="mb-5">{movies.length} Result found</p>

            </>
          ) : (
            <>
              <div className="bg-gray-100 py-12">
                <Slider images={seriesData} />

              </div>
              <h1 className="text-4xl font-bold mb-20">Movies</h1>

            </>
          )}
          <div className="flex flex-wrap gap-x-6 gap-y-10 justify-between">
            {movies.map((movie, index) => (
              <MovieCard key={index} title={movie.title} genre={movie.genre} year={movie.year} image={movie.banner_image} />
            ))}
          </div>


        </div>
        </>)}
        

      </main>

  );
}
