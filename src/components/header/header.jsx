import React, {useRef, useContext, useEffect} from "react";
import { MoviesContext, tab } from "../../contexts/movies-context";
import { BiSolidMoviePlay } from "react-icons/bi";
import "./header.css";

export const Header = ()=>{
  const {searchQuery, onSearch, activeTab} = useContext(MoviesContext);
  const inputRef = useRef(null);

   useEffect(()=>{
    inputRef?.current?.focus();
   },[]); 
  
  return (
      <header className="bg-secondary text-white p-3 d-flex ">
        <div className="logo">
          <span><BiSolidMoviePlay /></span>
          <h1>My Movies</h1>
        </div>
        {activeTab === tab.search && (
          <input
          ref={inputRef} 
          value={searchQuery}
          type="text" 
          placeholder="Search..." 
          className="form-control"
          onChange={(e) => onSearch(e.target.value)}
          />
        )}  
      </header>
    );
  };