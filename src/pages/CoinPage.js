import React, { useState, useEffect, useContext } from 'react';
import { CurrencyContext, SymbolContext } from '../App';
import { SingleCoin } from '../config/api';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CoinInfo from '../components/CoinInfo';

const CoinPage = () => {
  const [currency] = useContext(CurrencyContext);
  const [symbol] = useContext(SymbolContext);
  
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const fetchCoin = async () => {
    const res = await fetch(SingleCoin(id));
    const data = await res.json();
    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
  return (
    <div className='flex flex-col lg:flex-row mt-2 overflow-hidden'>
      <Sidebar coin={coin} symbol={symbol} currency={currency} />
      {coin !== undefined && (<CoinInfo coin={coin} currency={currency} />)}
    </div>
  );
};

export default CoinPage;
