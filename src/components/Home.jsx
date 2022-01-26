import React, { useEffect } from 'react';
import Navbar from './Navbar';
import TrendingGiph from './TrendingGiph';
import { useState } from 'react';
import axios from 'axios';

const Home = () => {


  return <div className='flex flex-col justify-center'>
      <Navbar />
      <div className='overflow-hidden'>
          <TrendingGiph />
      </div>
  </div>;
};

export default Home;
