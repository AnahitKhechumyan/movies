import React, { useState,useContext, useReducer, useEffect, useRef} from "react";
import axios from 'axios';
import { Table } from "../../components/table/table";
import { Modal } from "../../components/modal/modal";
import { omdbApi } from "../../api/movie.api";
import { MovieDetails } from "./movie-details/movie-details";
import { MoviesContext } from "../../contexts/movies-context";
import { APP_TITLE } from "../../utils/constants";
import { getAppTitleByMovie } from "../../utils/helpers";
import {Pagination} from "../../components/pagination";
import videoBg from "../../assets/images/videoBg.mp4";
import "./search-movies.css";
 
const initialState = {
  data: [],
  open: false,
  selectedMovie: null,
};

const searchMovieReducer = (state, action) =>{
  switch (action.type) {
    case 'SET_DATA'://{ type: "SET_DATA", payload: [] }
      return {...state, data: action.payload};
    case 'SET_MODAL_OPEN': // { type: "SET_MODAL_OPEN", payload: false }
      return {...state, open: action.payload};
    case 'SET_SELECTED_MOVIE': // { type: "SET_MODAL_OPEN", payload: false }
      return {
        ...state,
        open: action.payload.open,
        selectedMovie: action.payload.selectedMovie,
      };
      default:
        break;
  }
};
export const SearchMovies = () => {
  const {searchQuery, onSearch} = useContext(MoviesContext);
   
  const [state, dispatch] = useReducer(searchMovieReducer, initialState);

  const timeoutIdRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(5);

  useEffect(() => {
    axios.get('data.json')
        .then(res => {
          dispatch({type: 'SET_DATA', payload: res.data.results});
                setLoading(false);
            })
            .catch(() => {
                console.error('There was an error while retrieving the data')
            })
}, [])

const indexOfLastMovies = currentPage * moviesPerPage;
const indexOfFirstMovies = indexOfLastMovies - moviesPerPage;
const currentMovies = state.data.slice(indexOfFirstMovies, indexOfLastMovies);
const nPages = Math.ceil(state.data.length / moviesPerPage);
 
  const fetchMovies = async () => {
    const response = await omdbApi.fetchMoviesBySearch(searchQuery || "");

    if (response.success) {
      dispatch({ type: 'SET_DATA', payload: response.data.Search || [] });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const movieId = urlParams.get("movieId");
    const title = urlParams.get("title");
    const year = urlParams.get("year");

    if (movieId && title && year) {
      dispatch({
        type: "SET_SELECTED_MOVIE",
        payload: { 
          open:true,
          selectedMovie:{imdbID: movieId, Title: title, Year: year},
        },
      });
       document.title = getAppTitleByMovie(title, year);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    clearTimeout(timeoutIdRef.current);
    const toId = setTimeout(() => {
      fetchMovies();
    }, [1000]);

    timeoutIdRef.current = toId;
  }, [searchQuery]);

  const handleRowClick = (row) => {
    dispatch({
      type: "SET_SELECTED_MOVIE",
      payload: {
        open: true,
        selectedMovie: row,
        },
    });

    document.title =getAppTitleByMovie(row.Title,row.Year);

    window.history.pushState(
      null,
      "",
      `?movieId=${row.imdbID}&title=${row.Title}&year=${row.Year}`
    );
  };

  const handleCloseModal = () => {
    dispatch({
      type: "SET_MODAL_OPEN",
      payload:false, 
       });
    window.history.pushState("", "", "/");
    document.title = APP_TITLE;

  };

  return (
    <div className="container">
      <video src={videoBg} autoPlay loop muted/>
      <div className="content">
          {
            searchQuery !== ""  && <Table data={currentMovies} onRowClick={handleRowClick} />
          }
          {
            currentMovies.length !== 0 &&  <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            />
          }
           <Modal
        open={state.open}
        onClose={handleCloseModal}
        title={getAppTitleByMovie(state.selectedMovie?.Title, state.selectedMovie?.Year)}
      >
      <MovieDetails id={state.selectedMovie?.imdbID} />
      </Modal>
      </div>  
    </div>
  );
};