import React, { useContext } from 'react';
import Select from 'react-select';
import { CurrencyContext } from '../App';

const Header = () => {
  const [currency,setCurrency] = useContext(CurrencyContext)
  
  const options = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'NGN', label: 'NGN' },
  ];
  const handleSelect = (value) => {
    setCurrency(value.value);
    console.log(currency)
  };
  
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      color: 'rgb(15, 23, 42)',
      cursor:'pointer'
    }),
  };
  return (
    <div className='flex justify-between px-4 py-3'>
      <h2 className='text-xl'>CoinTracker</h2>
      <Select defaultValue={options[0]} onChange={handleSelect} options={options} styles={customStyles} isSearchable={false}/>
    </div>
  );
};

export default Header;
