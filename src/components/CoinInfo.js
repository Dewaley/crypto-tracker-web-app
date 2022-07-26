import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import { chartDays } from '../config/data';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const CoinInfo = ({ coin, currency }) => {
  const [history, setHistory] = useState();
  const [days, setDays] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const chartData = async () => {
    setIsLoading(true);
    const res = await fetch(HistoricalChart(coin.id, days, currency));
    const data = await res.json();
    console.log('data', data.prices);
    setHistory(data.prices);
    setIsLoading(false);
  };
  useEffect(() => {
    chartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);
  return (
    <div className='basis-2/3 m-2'>
      {isLoading === false && (
        <div>
          <Line
            data={{
              labels: history.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: history.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: '#EEBC1D',
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div className='flex justify-center items-center'>
            {chartDays.map((day) => {
              return (
                <button
                  onClick={() => setDays(day.value)}
                  className='bg-white text-slate-900 px-4 py-2 rounded m-2 font-sm sm:font-base'
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinInfo;
