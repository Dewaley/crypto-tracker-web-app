import React from 'react';
import Carousel from './Carousel';


const Banner = ({isLoading,setIsLoading}) => {
  return (
    <div className='text-center bg-slate-800'>
      <h1 className='font-bold text-6xl my-2'>Coin Tracker</h1>
      <p className='font-light'>
        I have a magical orb that helps me monitor all coins
      </p>
      <Carousel
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default Banner;
