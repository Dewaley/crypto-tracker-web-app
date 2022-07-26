import React from 'react';
import parse from 'html-react-parser';

const Sidebar = ({ coin, currency, symbol }) => {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className='basis-1/3'>
      {coin !== undefined && (
        <div className='p-5 text-lg flex flex-col justify-center items-center lg:items-start lg:border-r-2 lg:border-white'>
          <div className='flex justify-center w-full'>
            <img src={coin.image.large} alt='' className='w-60' />
          </div>
          <h1 className='text-4xl font-bold text-center'>{coin.name}</h1>
          {coin.description.en !== '' && (
            <p className='font-light my-3'>
              {parse(coin.description.en.split('. ')[0])}.
            </p>
          )}
          {coin.market_cap_rank !== null && (
            <p className='font-bold text-2xl flex my-2'>
              Rank:{' '}
              <span className='font-light ml-2'>{coin.market_cap_rank}</span>
            </p>
          )}
          {coin.market_data.current_price[currency.toLowerCase()] !== 0 && (
            <p className='font-bold text-2xl flex my-2'>
              Current Price:{' '}
              <span className='font-light ml-2'>
                {symbol}
                {coin.market_data.current_price[currency.toLowerCase()] > 1
                  ? numberWithCommas(
                      coin.market_data.current_price[currency.toLowerCase()]
                    )
                  : coin.market_data.current_price[currency.toLowerCase()]}
              </span>
            </p>
          )}
          {coin.market_data.market_cap[currency.toLowerCase()] !== 0 && (
            <p className='font-bold text-2xl flex my-2 '>
              Market Cap:{' '}
              <span className='font-light ml-2'>
                {symbol}
                {numberWithCommas(
                  coin.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
