import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Gif from './components/Gif';
import Favorites from './components/Favorites';
import RandomGifs from './components/RandomGifs';
import SearchGif from './components/SearchGif';


function App() {
  return (
   <BrowserRouter>
   <Routes>
     <Route path='/' element={<Home />}/>
     <Route path='/:id' element={<Gif />}/>
     <Route path='/fav-gifs' element={<Favorites />}/>
     <Route path='/random' element={<RandomGifs />}/>
     <Route path='/search/:q' element={<SearchGif />}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
