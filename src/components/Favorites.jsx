import React, { useState } from 'react';
import Navbar from './Navbar';
import {Link} from 'react-router-dom'

const Favorites = () => {

  const [gifs, setGifs] = useState(JSON.parse(sessionStorage.getItem('Fav')))
  const [width, setWidth] = useState(window.innerWidth)
  console.log(gifs)

  return <>
     <Navbar />
     <div className='md:container md:mx-auto pt-14 pb-10 md:px-0 px-5'>
       <h1 className='mb-12 text-xl font-medium text-center '>Favorites gifs</h1>  
     <div className='grid grid-flow-row md:grid-cols-3 grid-cols-2 justify-items-center gap-3'>
         {
             gifs?.map((gif) => (
                 <div className='' key={gif.id}>
                    <Link to={`/${gif.id}`}><img src={gif.images.fixed_height.url} width={width} className='rounded-lg' /></Link>
                 </div>
             ))
         }

     </div>
     </div>
  </>
};

export default Favorites;
