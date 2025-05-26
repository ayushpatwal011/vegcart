import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const MainBanner = () => {
  return (
    <div className='relative'>
      {/* Desktop Banner */}
      <img className='w-full hidden md:block' src={assets.main_banner_bg} alt='banner' />
      {/* Mobile Banner */}
      <img className='w-full md:hidden' src={assets.main_banner_bg_sm} alt='banner' />

      {/* Overlay Content */}
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-105 leading-tight lg:leading-tight'>
          Freshness You Can Trust, Savings You Will Love!
        </h1>

        {/* Buttons */}
        <div className='flex flex-col md:flex-row items-center gap-4 mt-6 font-medium'>
          <Link
            to='/products'
            className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white'
          >
            Shop Now
            <img
              className='md:hidden transition-transform group-hover:translate-x-1'
              src={assets.white_arrow_icon}
              alt='arrow'
            />
          </Link>

          <Link
            to='/products'
            className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'
          >
            Explore Deals
            <img
              className='transition-transform group-hover:translate-x-1'
              src={assets.black_arrow_icon}
              alt='arrow'
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
