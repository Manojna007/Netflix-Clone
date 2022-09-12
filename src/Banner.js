import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";
const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
  function truncate(String,n){
    
    
    return String?.length>n ? String.substr(0,n-1)+ '....': String;
  }
      const [movie, setMovie] = useState({});
      useEffect(() => {
        async function fetchMovie() {
          const request = await axios.get(requests.fetchNetflixOriginals);
          setMovie(
            request.data.results[
              Math.floor(Math.random() * request.data.results.length)
            ]
          ); 
        }
        fetchMovie();
      }, []);
      console.log(movie);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('${base_url}${movie?.backdrop_path}')`, //optional chaining: no need to check if movie is undefined '?' saw this neat trick on stackoverflow
        backgroundPosition: "center center",
      }}
    >
   <div className='banner-contents'>
      <h1 className='banner-title'>
      {movie?.name || movie?.title || movie?.orginal_name}
      </h1>
      <div className='banner-buttons'>
          <button className='banner-button'>Play</button>
          <button className='banner-button'>My List</button>
      </div>
      <h1 className='banner-desc'>{truncate(movie?.overview,150)}</h1>

   </div>
   <div className='banner-fadeBottom' />

   </header>
  )
}

export default Banner;