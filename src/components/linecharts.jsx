import React from 'react';

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
import { Line } from 'react-chartjs-2';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};


 

export default function Linecharts( {labels,cases}) {

  
  return(<div className='linechart'>
    {
      
        <Line options={options}  data = {{
          labels,
          datasets: [
            {
              label: 'Dataset 1',
              data: cases,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            
          ],
        }} />
      
    }
  </div>) 
  }
