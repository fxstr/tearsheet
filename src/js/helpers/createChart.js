import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

export default ({ data, container } = {}) => {
    return new Chart(container, {
        type: 'line',
        data: {
            datasets: data, /*[{
                label: 'SPY',
                data,
                borderColor: 'hsl(171, 100%, 41%)',
            }],*/
        },
        options: {
            animation: {
                duration: 0,
            },
            borderJoinStyle: 'round',
            pointStyle: false,
            elements: {
                line: {
                    borderWidth: 2,
                },
            },
            scales: {
                x: {
                    type: 'timeseries',
                }
            }
        }
    });
};
