import axios from "./axios";
import React, { useState, useEffect } from "react";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';
const baseURL = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchURL, isLarge }) => {
  const [movies, setmovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchURL);
      //   console.log(request.data.results);
      setmovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390px",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleCLick = (movie) =>{
    if(trailerUrl){
      settrailerUrl("")
    }else{
      movieTrailer(movie?.name || movie?.title || movie?.original_title ||  " ")
      .then(url =>{
        const urlParams = new URLSearchParams( new URL(url).search);
        settrailerUrl(urlParams.get('v'));  
      })
      .catch(error =>{
        console.log(error);
        alert(`Sorry no trailer found for ${movie.title || movie.name}`)
      })
    }
  }

  return (
    <React.Fragment>
      <div className="row">
        <h2 style={{ color: "white" }}>{title}</h2>
        <div className="row-posters">
          {movies.map((movie) => {
            return (
              <img
                key={movie.id}
                className={isLarge ? "rowBigPoster" : "row_poster"}
                src={`${baseURL}${
                  isLarge ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={()=>handleCLick(movie)}
              />
            );
          })}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </React.Fragment>
  );
};

export default Row;
