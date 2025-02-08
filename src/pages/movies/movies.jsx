import {useState, useEffect} from "react";
import { Table } from "../../components/table/table";
import axios from 'axios';
import "./movies.css";
import { useLocalStorageState } from "../../hooks/use-local-storage-state"; 
import {Pagination} from "../../components/pagination";

export const Movies = () => {
  const [moviesState, setMovies] = useLocalStorageState([], "movies");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(4);
 
  
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
const currentMovies = moviesState.slice(indexOfFirstMovies, indexOfLastMovies);
const nPages = Math.ceil(moviesState.length / moviesPerPage);
 
  
    return (
      <div className="background">
        <i className="bi bi-heart" style={{fontSize: "2rem", color: "red"}}>My Favorite Movies</i> 
        <div className="favorite">
             <Table data={currentMovies} onRowClick={()=>{}} />
        </div>
        <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
         />
      </div>

    );
  };