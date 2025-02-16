import "./table.css";
import imdbLogo from "../../assets/images/imdbLogo.png";

export const Table = ({ data, onRowClick}) => {
  const handleOpenIMDBMovie = (event, imdbID) => {
    event.stopPropagation();
    window.open( `https://www.imdb.com/title/${imdbID}`,"")
      // `https://www.imdb.com/title/${event.target.dataset.imdbId}/`
     
  };
  
    return (
      <div className="table-container"> 
          <table className="table table-striped mt-3 table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Poster</th>
                <th>Title</th>
                <th>Year</th>
                <th>Type</th>
                <th className="text-md-end">IMDB ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((movie) => (
                <tr key={movie.imdbID} onClick={() => onRowClick(movie)}>
                  <td>
                    <img width="50" src={movie.Poster} alt={movie.Title} />
                  </td>
                  <td>{movie.Title}</td>
                  <td>{movie.Year}</td>
                  <td>{movie.Type}</td>
                  <td className="text-md-end">
                     <div className="d-flex justify-content-end">
                         <button className="btn btn-link" 
                         onClick={(event)=>handleOpenIMDBMovie(event, movie.imdbID)}>
                          Watch on IMDB
                          <img src={imdbLogo} alt="" width={30} height={15} />
                          </button>
                     </div>
                  </td>
                  <td> </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    );
  };

 