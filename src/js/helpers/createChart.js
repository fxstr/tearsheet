// Don't use chart.js because it does not support subplots.
import Plotly from 'plotly.js-dist-min';

var layout = {
    showlegend: false,
    dragmode: 'pan',
    height: Math.max(window.innerHeight * 0.75, 600),
    xaxis: {
    },
    yaxis: {
        // fixedrange: true,
    },
    yaxis1: {
        domain: [0.33, 1],
        title: 'Performance',
    },
    yaxis2: {
        domain: [0, 0.33],
        title: 'Drawdowns',
    }
  };

export default ({ data, container } = {}) => {
    Plotly.newPlot(
        container,
        data,
        layout,
        { scrollZoom: true },
    );
    
};
