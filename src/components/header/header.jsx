
import { BiSolidMoviePlay } from "react-icons/bi";
import "./header.css";

export const Header = ({onSearch,searchQuery})=>{
    return (
      <header className="bg-secondary text-white p-3 d-flex ">
        <div className="logo">
          <span><BiSolidMoviePlay /></span>
          <h1>My Movies</h1>
        </div>
        <input 
        value={searchQuery}
        type="text" 
        placeholder="Search..." 
        className="form-control"
        onChange={(e) => onSearch(e.target.value)}
        />
      </header>
    );
  };