import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Table } from "../../components/table/table";
import { Modal } from "../../components/modal/modal";
import { omdbApi } from "../../api/movie.api";
import { MovieDetails } from "./movie-details/movie-details";
import { APP_TITLE } from "../../utils/constants";
import { getAppTitleByMovie } from "../../utils/helpers";
import {Pagination} from "../../components/pagination";
 

export const SearchMovies = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const [open, setModalOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [init, setInit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(5);


  useEffect(() => {
    axios.get('data.json')
        .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(() => {
                console.log('There was an error while retrieving the data')
            })
}, [])


const indexOfLastMovies = currentPage * moviesPerPage;
const indexOfFirstMovies = indexOfLastMovies - moviesPerPage;
const currentMovies = data.slice(indexOfFirstMovies, indexOfLastMovies);
const nPages = Math.ceil(data.length / moviesPerPage);
 
  const fetchMovies = async () => {
    const response = await omdbApi.fetchMoviesBySearch(searchQuery || "");

    if (response.success) {
      setData(response.data.Search || []);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    console.log(window.location.search);

    const movieId = urlParams.get("movieId");
    const title = urlParams.get("title");
    const year = urlParams.get("year");

    if (movieId && title && year) {
      setModalOpen(true);
      setSelectedMovie({ imdbID: movieId, Title: title, Year: year });
       document.title = getAppTitleByMovie(title, year);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
    setInit(true);
  }, []);

  useEffect(() => {
    if (!init) return;

    clearTimeout(timeoutId);

    const toId = setTimeout(() => {
      fetchMovies();
    }, 1000);

    setTimeoutId(toId);
  }, [searchQuery]);

  const handleRowClick = (row) => {
    setModalOpen(true);
    setSelectedMovie(row);

    document.title =getAppTitleByMovie(row.Title,row.Year);

    window.history.pushState(
      null,
      "",
      `?movieId=${row.imdbID}&title=${row.Title}&year=${row.Year}`
    );
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    window.history.pushState("", "", "/");
    document.title = APP_TITLE;

  };

  return (
    <div className="container mt-4">
      <Table data={currentMovies} onRowClick={handleRowClick} />
      <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
       />
      <Modal
        open={open}
        onClose={handleCloseModal}
        title={getAppTitleByMovie(selectedMovie?.Title, selectedMovie?.Year)}
      >
        <MovieDetails id={selectedMovie?.imdbID} />
      </Modal>
       
    </div>
  );
};