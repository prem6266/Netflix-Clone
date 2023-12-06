import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "547822a6b7f6a1751e82f86399db4e43";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const NowPlaying = "now_playing";
const Popular = "popular";
const TopRated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [upComingMovie, setupComingMovie] = useState([]);
  const [NowPlayingMovie, setNowPlaying] = useState([]);
  const [PopularMovie, setPopular] = useState([]);
  const [TopRatedMovie, setTopRated] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
      setupComingMovie(results);
    };

    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${NowPlaying}?api_key=${apiKey}`);
      setNowPlaying(results);
    };

    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${Popular}?api_key=${apiKey}`);
      setPopular(results);
    };

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${TopRated}?api_key=${apiKey}`);
      setTopRated(results);
    };
    const getAllGenre = async () => {
      // https://api.themoviedb.org/3/genre/movie/list?api_key=547822a6b7f6a1751e82f86399db4e43
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
      console.log(genres);
    };
    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    getAllGenre();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: PopularMovie[0]
            ? `url(${`${imgUrl}/${PopularMovie[0].poster_path}`})`
            : "$bg: rgb(9, 10, 10);",
        }}
      >
        {PopularMovie[0] && <h1>{PopularMovie[0].original_title}</h1>}
        {PopularMovie[0] && <p>{PopularMovie[0].overview}</p>}

        <div>
          <button>
            <BiPlay /> Play
          </button>
          <button>
            <AiOutlinePlus /> My List
          </button>
        </div>
      </div>
      <Row title={"Upcoming "} arr={upComingMovie} />
      <Row title={"Now Playing"} arr={NowPlayingMovie} />
      <Row title={"Popular"} arr={PopularMovie} />
      <Row title={"Top Rated"} arr={TopRatedMovie} />

      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
