// Don't use chart.js because it does not support subplots.
import Plotly from 'plotly.js-dist-min';

var layout = {
    showlegend: false,
    dragmode: 'pan',
    height: Math.max(window.innerHeight * 0.75, 600),
    xaxis: {
    },
    yaxis: {
        // https://stackoverflow.com/questions/42043633/format-y-axis-as-percent-in-plot-ly
        // https://d3js.org/d3-format
        domain: [0.33, 1],
    },
    yaxis2: {
        domain: [0, 0.33],
        title: 'Drawdowns',
        // See yaxis 1
        tickformat: '.1%',
    }
  };

export default ({ data, container } = {}) => {
    return {
        // Also return Plotly reference to use e.g. relayout from the outside
        plotly: Plotly,
        chart: Plotly.newPlot(
            container,
            data,
            layout,
            { scrollZoom: true },
        ),
    };
    
};
