import React, {useRef, useContext, useEffect} from "react";
import { MoviesContext, tab } from "../../contexts/movies-context";
import "./header.css";

export const Header = ()=>{
  const {searchQuery, onSearch, activeTab} = useContext(MoviesContext);
  const inputRef = useRef(null);

   useEffect(()=>{
    inputRef?.current?.focus();
   },[]); 
  
  return (
      <header className="bg-secondary text-white   d-flex ">
        <div className="logo">
          <span>🎬</span>
          <h1>My Movies</h1>
        </div>
        {activeTab === tab.search && (
          <input
          ref={inputRef} 
          value={searchQuery}
          type="text" 
          placeholder="  Search..." 
          className="form-control-header"
          onChange={(e) => onSearch(e.target.value)}
          />
        )} 
      </header>
    );
  };