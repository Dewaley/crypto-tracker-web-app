/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { TrendingCoins } from '../config/api';
import { CurrencyContext, SymbolContext, LoadingContext } from '../App';

const Carousel = () => {
  const [isLoading, setIsLoading] = useContext(LoadingContext);
  const [currency] = useContext(CurrencyContext);
  const [symbol] = useContext(SymbolContext);
  const [trending, setTrending] = useState([]);
  const fetchTrending = async () => {
    setIsLoading(true);
    const res = await fetch(TrendingCoins(currency));
    const data = await res.json();
    setTrending(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchTrending();
  }, [currency]);
  const responsive = {
    o: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  const items = trending.map((coin) => {
    if (coin.price_change_percentage_24h === null) {
      return [];
    } else {
      let profit = coin.price_change_percentage_24h >= 0;
      return (
        <Link to={`/coin/${coin.id}`}>
          <div className='flex flex-col justify-center items-center mt-8 mb-4'>
            <img src={coin.image} alt={coin.name} className='w-20 mb-2' />
            <div>
              <span className='uppercase mr-0.5'>{coin.symbol}</span>
              <span
                className={`${profit ? 'text-emerald-700' : 'text-red-700'}`}
              >
                {profit && '+'}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
            <span className='text-xl font-medium'>
              {symbol}
              {coin.current_price.toFixed(2) > 1
                ? numberWithCommas(coin.current_price.toFixed(2))
                : coin.current_price.toFixed(2)}
            </span>
          </div>
        </Link>
      );
    }
  });
  return (
    <div>
      {isLoading ? (
        <div class='overflow-hidden opacity-75 flex flex-col items-center justify-center my-4'>
          <div class='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4'></div>
          <h2 class='text-center text-white text-xl font-semibold'>
            Loading Coins...
          </h2>
          <p class='w-1/3 text-center text-white'>
            This may take a few seconds, please don't close this page.
          </p>
        </div>
      ) : (
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          responsive={responsive}
          autoPlay
          items={items}
          disableButtonsControls
        />
      )}
    </div>
  );
};

export default Carousel;
