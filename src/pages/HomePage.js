import React from 'react';
import Banner from '../components/Banner';
import CoinTable from '../components/CoinTable';
const HomePage = ({ currency, symbol, isLoading, setIsLoading }) => {
  return (
    <div>
      <Banner
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <CoinTable
        currency={currency}
        symbol={symbol}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default HomePage;
