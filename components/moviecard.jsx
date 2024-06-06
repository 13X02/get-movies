import { use, useEffect, useState } from 'react';
const MovieCard = ({ title, genre, year, image  }) => {
    const movieDetails = { title, genre, year, image };
    const storedMovie = JSON.parse(localStorage.getItem(title));

    const [liked, setLiked] = useState(storedMovie ? storedMovie.liked : false);

    const handleLikeToggle = () => {
      const newLiked = !liked;
      setLiked(newLiked);

      const movieDataToStore = { ...movieDetails, liked: newLiked };
      localStorage.setItem(title, JSON.stringify(movieDataToStore));
      window.dispatchEvent(new Event("storage"));
    };
  

    return (
      <div className="flex flex-col relative " style={{
        width: "250px",
        height: "470px",
      }}>
        <button 
          className="absolute top-2 right-2 p-2 rounded-full bg-white border-none"
          onClick={handleLikeToggle}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill={liked ? "red" : "none"} 
            stroke={liked ? "red" : "currentColor"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <img className="rounded-xl" src={image} alt={title} width={250} height={370} />

        <p style={{
            fontSize:"14px",
            fontWeight:"400",
            color:"#757575"
        }}>{year}</p>
        <h3 className="" style={{
            fontSize: "18px",
            fontWeight: "700",
            color:"#111827"
            
        }}>{title}</h3>
        <p style={{
            fontSize:"14px",
            fontWeight:"400",
            color:"#757575"

        }}>{genre}</p>
      </div>
    );
  };

export default MovieCard;