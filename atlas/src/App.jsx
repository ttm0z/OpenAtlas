import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Router, Route, Routes} from 'react-router-dom';
import GetUsers from './components/GetUsers'
import Home from './components/Home'
import NotFound from './components/Home'
import Navbar from './components/Navbar'
import MapDisplay from './components/MapDisplay'
import CountryDetail from './components/CountryDetail'


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Render Home component when root path is matched */}
        <Route path="/getUsers" element={<GetUsers />} />
        <Route path="" />
        <Route path="/maps" element={<MapDisplay />} />
        <Route path="/country/:countryName" element = {<CountryDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
