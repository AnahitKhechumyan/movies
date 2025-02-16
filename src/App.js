import React, { useContext } from "react";
import { Header } from "./components/header/header";
import { SearchMovies } from "./pages/search-movies/search-movies";
import { Movies } from "./pages/movies/movies";
import { MoviesProvider, tab, MoviesContext } from "./contexts/movies-context";
import {Quizis} from "./components/quizis/quizis";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css" 


 
const Tabs = ()=>{
  const {setActiveTab} = useContext(MoviesContext);
  
  return (
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
        <li className="nav-item">
            <button onClick={() => {}} className="nav-link">
                Quizis
            </button>
        </li>
     </ul>
  );
};

const Layout =()=>{
  const {activeTab} = useContext(MoviesContext);
  return activeTab === tab.search ? <SearchMovies /> : <Movies /> || <Quizis/>;
};

 
function App() {
   return (
    <MoviesProvider> 
      <div className="App">
        <Header />
        <Tabs/>
        <Layout />
      </div>
    </MoviesProvider>
  );
}

export default App;
