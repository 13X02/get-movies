import React, { useState, useEffect } from 'react';

const Slider = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [imageUrl, setImageUrl] = useState(images[0].url);
  
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentSlide((prevSlide) => {
            const nextSlide = (prevSlide + 1) % images.length;
            setImageUrl(images[nextSlide].url);
            console.log(nextSlide);
            return nextSlide;
          });
        }, 20000);
    
        return () => clearInterval(interval);
      }, [images.length]);
    const changeSlide = async (index) => {
      await setCurrentSlide(index);
      await setImageUrl(images[index].url);
      console.log(index);
    };
  
    return (
      <div className="relative" style={{ maxHeight: "650px" }}>
        <div className="absolute bottom-0 right-0 mb-4 mr-4 z-10">
          <div className="flex">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => changeSlide(index)}
                className={` ${currentSlide === index ? "w-8 rounded-xl h-2 bg-white" : "w-2 h-2 mx-1 rounded-full bg-gray-300 opacity-50 hover:opacity-1"
                  }`}
              />
            ))}
          </div>
        </div>
        <div className="max-w-full overflow-hidden" style={{ paddingX: "32px" }}>
          <div className="max-w-full flex transition-opacity duration-500 ease-in-out">
            {images.map((image, index) => (
              <div
                key={index}
                className={`max-w-full flex-shrink-0 ${currentSlide === index ? "opacity-100" : "opacity-0 hidden"} px-10 py-20 rounded-3xl flex flex-col-reverse`}
                style={{
                  width: "100%",
                  backgroundImage: `url(${imageUrl})`,
                  height: "650px",
                  backgroundSize: "cover",
                  color: "white"
                }}
              >
                <div className="w-1/2 flex flex-col gap-5">
                  <h1 className=" font-bold text-white" style={{
                    fontSize:"48px",
                    fontWeight:"700",
                  }}>{image.title}</h1>
                  <p className="text-sm text-white" style={{
                    fontSize:"14px",
                    fontWeight:"400",
                  }}>{image.description}</p>
                  <a href={image.link} target="_blank" rel="noopener noreferrer">
                    <button className="bg-white text-black p-1 rounded-md mt-2 w-36 h-8 flex justify-center gap-2">
                      <img src="/play.svg" alt="Play" />Watch Trailer
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
    export default Slider;