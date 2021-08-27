import React from "react";
import { Line } from 'react-chartjs-2';


export default  function LineChart(props){

    const data = {
        // labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
          {
            label: 'Stocks',
            // data: [12, 19, 3, 5, 2, 3,90],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      };
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

      const [chartData, setChartData] = React.useState(data);

    React.useEffect(() => {
        const labels = [];
        const values = [];
        props.stockData && Object.keys(props.stockData).map(value => {
            const data = props.stockData[value];
            labels.push(value.split(" ")[1]);
            values.push(data["5. volume"]);
        });
        data.labels = labels;
        data.datasets[0].data = values;
        console.log(chartData);
        setChartData(data);
    }, [props]);

    return(
    <div className="chart-container">
      <Line data={chartData} options={options} style={{width:"500px", height:100}}/>
    </div>
    )
};