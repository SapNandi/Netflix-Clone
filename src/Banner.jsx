import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./Request";
import "./Banner.css";
// const baseURL = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setmovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      //   console.log(request.data.results.length);
      setmovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    };
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  //   console.log(movie)
  return (
    <React.Fragment>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          //   backgroundPosition: "center center",
          objectFit: "contain",
        }}
      >
        <div className="banner-contents">
          <h2 style={{ color: "white", fontSize: "2.5rem" }}>
            {movie?.name || movie?.title || movie?.original_name}{" "}
          </h2>
          <div className="content">
            <button className="btn">Play</button>
            <button className="btn">List</button>
          </div>
          <div className="info">
            <p style={{ color: "white" }}>{truncate(movie?.overview, 120)}</p>
          </div>
        </div>
        <div className="adjustment-layer"></div>
      </header>
    </React.Fragment>
  );
}

export default Banner;
