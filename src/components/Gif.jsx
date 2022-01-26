import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { GiD10 } from 'react-icons/gi';
import Navbar from './Navbar';

const Gif = () => {
    const { id } = useParams();
    const [gifData, setGifData] = useState({});
    const [loading, setLoading] = useState(false);

    const URL = `https://api.giphy.com/v1/gifs/${id}`;

    const getGifById = async (url) => {
        setLoading(true)
        try {
            const { data } = await axios.get(url, {
                params: {
                    api_key: 'zVhHzC29cJdYebSUUA7GfDHZSN5ddgq3'
                }
            }, [])
            setGifData(data.data)
            console.log(data);
            setLoading(false)
        } catch (error) {
            setLoading(true)
            console.log(error)
        }
    }

    useEffect(() => {
        getGifById(URL)
    }, [])

    return (
        <>
            <Navbar />
            <div className='container mx-auto pt-10'>
                {
                    loading ? <>
                        <div className='pt-10'>
                            <AiOutlineLoading3Quarters fontSize={40} className='animate-spin mx-auto ' />
                        </div>
                    </> : <>
                        <div className='border border-gray-300 rounded-md shadow-xl '>
                            <div className='flex flex-row p-3 space-x-4'>
                                <div className='flex flex-col w-full space-y-4'>
                                    <div className='text-xl font-medium '>
                                        {gifData?.title}
                                    </div>
                                    <div >
                                        {gifData?.user?.display_name}
                                    </div>
                                    <div className='break-words text-justify '>
                                        {gifData?.user?.description}
                                    </div>
                                </div>
                                <div className=''>
                                    <img src={gifData?.images?.original.url} />
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )

};

export default Gif;
