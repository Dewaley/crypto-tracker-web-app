/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { CurrencyContext, LoadingContext, SymbolContext } from '../App';
import ReactPaginate from 'react-paginate';
import { CoinList } from '../config/api';
import { useNavigate } from 'react-router-dom';

const CoinTable = () => {
  const navigate = useNavigate()
  const [currency] = useContext(CurrencyContext);
  const [symbol] = useContext(SymbolContext);
  const [isLoading, setIsLoading] = useContext(LoadingContext);
  const [coinList, setCoinList] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const fetchCoinList = async () => {
    setIsLoading(true);
    const res = await fetch(CoinList(currency));
    const data = await res.json();
    setCoinList(data);
    setIsLoading(false);
  };
  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  useEffect(() => {
    fetchCoinList();
  }, [currency, symbol]);
  const handleSearch = () => {
    return coinList.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  return (
    <div className='flex justify-center items-center flex-col pb-5'>
      <h1 className='text-center text-4xl max-w-xl my-3'>
        Cryptocurrency Prices By Market Cap
      </h1>
      <div className='w-11/12'>
        <input
          className='bg-transparent border-2 border-gray-700 p-3 w-full rounded text-white focus:border-gray-500 outline-none mb-5'
          type='text'
          name=''
          id=''
          placeholder='Search For a Cryptocurrency..'
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      {isLoading ? (
        <div className='overflow-hidden opacity-75 flex flex-col items-center justify-center my-4 w-full'>
          <div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4'></div>
          <h2 className='text-center text-white text-xl font-semibold'>
            Loading Coins...
          </h2>
          <p className='text-center text-white'>
            This may take a few seconds, please don't close this page.
          </p>
        </div>
      ) : (
        <div className='flex flex-col items-center w-full'>
          <table className='w-11/12 text-xs sm:text-base'>
            <thead className=''>
              <tr className='h-12 bg-white text-slate-900 rounded'>
                <th className='text-left px-4'>Coin</th>
                <th className='text-right'>Price</th>
                <th className='text-right'>24h change</th>
                <th className='text-right px-4'>Market Cap</th>
              </tr>
            </thead>
            <tbody className='w-11/12 table-auto bg-gray-800'>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((coin) => {
                  let profit = coin.price_change_percentage_24h >= 0;
                  return (
                    <tr className='border-b-2 border-gray-700 h-12 cursor-pointer' onClick={()=>navigate(`/coin/${coin.id}`)}>
                      <td className='w-3/12'>
                        <div className='flex items-center my-3'>
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className='h-8 sm:px-4 px-2'
                          />
                          <div className='flex flex-col'>
                            <span className='uppercase'>{coin.symbol}</span>
                            <span>{coin.name}</span>
                          </div>
                        </div>
                      </td>
                      <td className='text-right w-3/12'>
                        {symbol}
                        {coin.current_price > 999
                          ? numberWithCommas(coin.current_price)
                          : coin.current_price.toFixed(2)}
                      </td>
                      <td
                        className={`text-right w-3/12 ${
                          profit ? 'text-emerald-700' : 'text-red-700'
                        }`}
                      >
                        {profit && '+'}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td className='text-right w-3/12 px-4'>
                        {symbol}
                        {numberWithCommas(
                          coin.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <ReactPaginate
            pageCount={Math.ceil(handleSearch().length / 10)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            previousLabel={'<'}
            nextLabel={'>'}
            forcePage={page - 1}
            onPageChange={handlePageClick}
            containerClassName={'flex my-2 justify-center items-center'}
            pageClassName={
              'm-1 flex justify-center items-center h-8 w-8 hover:bg-slate-700 rounded-full transition-bg duration-500'
            }
            previousClassName={
              'm-1 flex justify-center items-center h-8 w-8 hover:bg-slate-700 rounded-full transition-bg duration-500'
            }
            nextClassName={
              'm-1 flex justify-center items-center h-8 w-8 hover:bg-slate-700 rounded-full transition-bg duration-500'
            }
            activeClassName={'bg-slate-700'}
          />
        </div>
      )}
    </div>
  );
};

export default CoinTable;
