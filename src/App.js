import React, { useState } from "react";
import "./App.css";
import { Header } from "./components/header/header";
import { SearchMovies } from "./pages/search-movies/search-movies";
import { Movies } from "./pages/movies/movies";
import "bootstrap-icons/font/bootstrap-icons.css" 
 
export const tab = {
  search: "search",
  movies: "movies",
}; 

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(tab.search);
  
    
   return (
    <div className="App">
       <Header searchQuery={searchQuery} onSearch={setSearchQuery} />
        <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                onClick={() => setActiveTab(tab.search)}
                className="nav-link"
              >
                Search Movies
              </button>
            </li>
            <li className="nav-item">
              <button onClick={() => setActiveTab(tab.movies)} className="nav-link">
                My Movie List
              </button>
            </li>
        </ul>
      {activeTab === tab.search ? (
        <SearchMovies searchQuery={searchQuery} />
      ) : (
        <Movies />
      )}
         
    </div>
  );
}

export default App;
