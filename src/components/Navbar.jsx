import React from 'react';
import { Link } from 'react-router-dom'
const Navbar = () => {
  return <header>
      <nav className='bg-black p-4 flex flex-row items-center justify-between'>
        <h1 className='text-white text-3xl'>Giphy</h1>
        <div className='flex flex-row text-white text-lg space-x-4'>
           <Link to={'/'}>Trending</Link>
          <Link to={'/random'}>
            Random
          </Link>
         <Link to={'/fav-gifs'}>
           Favorites
         </Link>
        </div>
      </nav>
  </header>;
};

export default Navbar;
