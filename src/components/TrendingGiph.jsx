import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { GrFavorite, GrLinkNext, GrLinkPrevious} from 'react-icons/gr'


const TrendingGiph = () => {


  const [gifs, setGifs] = useState([]);  // --> push search and fetch gifs in the array
  const [favGifs, setFavGifs] = useState([]); // --> spush fav gifs in the array
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [currentOffset, setCurrentOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()


  const trendingGiphsURL = 'https://api.giphy.com/v1/gifs/trending';
  

  const getApiData = async (url) => {  // --> fetch trending gifs 
    setLoading(true)
    try {
      const { data } = await axios.get(url, {
        params: {
          api_key: 'zVhHzC29cJdYebSUUA7GfDHZSN5ddgq3',
          limit: 30,
          offset: currentOffset
        }
      },[])
      console.log(data)
      setGifs(data.data)
      setLoading(false);
    } catch (error) {
      setLoading(true)
      console.log(error)
    }
  }

  useEffect(() => {
      getApiData(trendingGiphsURL);  
  }, [currentOffset, currentPage]);

  
  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${search}`);

    
  }

  const handleFav = (giph) => {
    const fav = gifs.filter((gif) => gif === giph);
    setFavGifs((currentFav) => currentFav.concat(fav))
    sessionStorage.setItem('Fav', JSON.stringify(favGifs))
  }

  const handleNext = () => {
     const nextPage = currentOffset + 30
     const page = currentPage + 1
     setCurrentPage(page);
     setCurrentOffset(nextPage);
  }

  const handlePrevious = () => {
    if(currentOffset >=  30 && currentPage >= 1) {
       const previousPage = currentOffset - 30;
       const page = currentPage - 1 
       setCurrentPage(page)
       setCurrentOffset(previousPage);
    }
  }



  return <>
    <div className='flex lg:flex-row flex-col-reverse justify-center md:items-start items-center pt-10 w-full '>
      {!gifs.length || loading ?
            <> 
            <div className='self-center max-w-md w-full p-3 ml-40 mr-40'>
            <AiOutlineLoading3Quarters fontSize={40} className='animate-spin mx-auto ' />
            </div>
            </> : <div className='grid grid-flow-row xl:grid-cols-3 grid-cols-2 md:gap-3 gap-2 justify-items-center px-4 md:px-8'>
        {
          gifs?.map((giph) => (
            <div key={giph.id} className='overflow-hidden'>
              <Link to={`/${giph.id}`}><img src={giph.images.fixed_height.url} width={width} className='rounded-lg' /></Link>
              <div className='py-2 flex-row flex items-center space-x-2'>
                <GrFavorite fontSize={24} onClick={() => handleFav(giph)} className={'cursor-pointer'} />
                <div>
                  Fav
                </div>
              </div>
            </div>
          ))
        }
      </div>
      }
      <div className='flex flex-col w-full space-y-2 md:space-y-5 items-center mb-6 lg:mb-0'>
       <div className='border border-gray-300 shadow-md w-full max-w-md p-2 rounded-md  md:mb-0'>
        <form action="" className='flex flex-col space-y-2' onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder='search' className='border border-black px-3 py-2 rounded-md w-full' value={search} onChange={handleChange} required />
          </div>
          <button type='submit' className='py-2 bg-black font-medium text-white px-3 rounded-md'>Search</button>
        </form>
       </div>
       <div className='border border-gray-300 shadow-md w-full max-w-md py-4 px-2 rounded-md flex flex-row justify-center items-center space-x-8'>
          <div className=''>
              <GrLinkPrevious fontSize={20} className='cursor-pointer' onClick={handlePrevious}/>
          </div>
          <div className='font-medium text-lg'>
              {currentPage}
          </div>
          <div>
             <GrLinkNext fontSize={20} className='cursor-pointer' onClick={handleNext}/>
          </div>
       </div>
      </div>
    
    </div>
  </>
};

export default TrendingGiph;
