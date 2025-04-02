import React, { useContext } from "react";
import { Header } from "./components/header/header";
import { SearchMovies } from "./pages/search-movies/search-movies";
import { Movies } from "./pages/movies/movies";
import { Quiz } from "./pages/quiz/quiz";
import { GoogleMap } from "./pages/map/map";
import { MoviesProvider, tab, MoviesContext } from "./contexts/movies-context";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css"; 
 
const Tabs = ()=>{
  const {setActiveTab, activeTab} = useContext(MoviesContext);

  const getTabClasses = (tab) => {
    return `nav-link ${activeTab === tab ? "active" : ""}`;
  };
  
  return (
    <ul className="nav nav-tabs">
       <li className="nav-item">
          <button
            onClick={() => setActiveTab(tab.search)}
            className={getTabClasses(tab.search)}
          >
             Search Movies
          </button>
        </li>
        <li className="nav-item">
            <button 
             onClick={() => setActiveTab(tab.movies)}
             className={getTabClasses(tab.movies)} 
            >
               My Movie List
             </button>
        </li>
        <li className="nav-item">
            <button 
             onClick={() => setActiveTab(tab.quiz)}
             className={getTabClasses(tab.quiz)}
            >
             <i class="bi bi-camera-reels"></i> Quiz
            </button>
        </li>
        <li className="nav-item">
            <button 
             onClick={() => setActiveTab(tab.map)}
             className={getTabClasses(tab.map)}
            >
            <i class="bi bi-geo-alt"></i>  You can find the Cinema nearest You here.
            </button>
        </li>
     </ul>
  );
};

const Layout =()=>{
  const { activeTab } = useContext(MoviesContext);

  return (
    <>
      {activeTab === tab.search && <SearchMovies />}
      {activeTab === tab.movies && <Movies />}
      {activeTab === tab.quiz && <Quiz />}
      {activeTab === tab.map && <GoogleMap />}
    </>
  );
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
