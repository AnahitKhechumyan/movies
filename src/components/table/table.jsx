import "./table.css";

export const Table = ({ data, onRowClick}) => {
  
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
                  <td className="text-md-end">{movie.imdbID}</td>
                  <td>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    );
  };

 