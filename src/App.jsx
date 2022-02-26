import React from "react";
import Row from "./Row.jsx";
import requests from "./Request";
import "./App.css";
import Banner from "./Banner.jsx";
import Navbar from "./Navbar.jsx"

const App = () => {
  return (
    <React.Fragment>
      <div className="app">
        <Navbar />
        <Banner />
        <Row
          title="NETFLIX ORIGINALS"
          fetchURL={requests.fetchNetflixOriginals}
          isLarge
        />
        <Row title="Trending Now" fetchURL={requests.fetchTrending} />
        {/* <Row title="Top Rated" fetchURL={requests.fetchTopRated} /> */}
        <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
        <Row title="Romantic Movies" fetchURL={requests.fetchRomanticMovies} />
      </div>
    </React.Fragment>
  );
};

export default App;
