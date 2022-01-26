import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { GrFavorite } from 'react-icons/gr'
import {Link} from 'react-router-dom'
import Gif from './Gif';


const RandomGifs = () => {
    
  const [randomGif, setRandomGif] = useState({});
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [tag, setTag] = useState('');

  const randomUrl = 'https://api.giphy.com/v1/gifs/random'

  const fetchRandomGifs = async (url) => {
    
    setLoading(true)
    try {
    const {data} = await axios.get(url, {
        params: {
            api_key: 'zVhHzC29cJdYebSUUA7GfDHZSN5ddgq3',
            tag: tag
        }
    })

    setRandomGif(data.data);
    console.log(data);
    setLoading(false)
    } catch (error) {
        setLoading(true)
        console.log(error)
    }
  }

  useEffect(()=> {
      fetchRandomGifs(randomUrl)
  }, [])

  if(loading) {
      return <> 
         <Navbar />
         <AiOutlineLoading3Quarters fontSize={40} className='mx-auto mt-10' />
      </>
  }

  const handleChange = (e) => {
      setTag(e.target.value)
  }

  const handleSubmit = (e) => {
      e.preventDefault();

      fetchRandomGifs(randomUrl);
  }


  
  return <>
      <Navbar />
      <div className='md:container md:mx-auto pt-10'>
          <div className='flex md:flex-row flex-col-reverse md:space-x-10 md:items-start items-center justify-center'>
          <div className='grid grid-flow-row grid-cols-1 justify-items-center mt-4 md:mt-0'>
              <div className='border border-gray-300 shadow-lg rounded-md h-auto p-3 max-w-md w-full'>
                  <div className='text-lg font-medium mb-4'>
                      {randomGif.title}
                  </div>
                  <div className='overflow-hidden'>
                     <Link to={`/${randomGif.id}`}> <img src={randomGif?.images?.fixed_height.url} alt="" width={width} /> </Link> 
                  </div>
              </div>
          </div>
          <div className='border w-full max-w-md p-2 rounded-md border-gray-300 shadow-lg'>
              <form action="" className='flex flex-col space-y-3' onSubmit={handleSubmit}>
                  <div>
                      <input type="text" placeholder='tag' value={tag} onChange={handleChange} className='w-full border-black border p-3 rounded-md'/>
                  </div>
                  <button type='submit' className='py-3 px-2 font-medium text-white rounded-md bg-black'>Search</button>
              </form>
          </div>
          </div>
      </div>
  </>
};

export default RandomGifs;
