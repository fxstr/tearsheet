<script setup>
    // Don't use chart.js because it does not support subplots.
    import { watchEffect, ref, unref } from 'vue';
    import createChart from '../helpers/createChart';
    import { getNormalizedAsSeries, getRelativeDrawdownAsSeries } from 'portfolio-analysis';

    let chart;
    let Plotly;

    const getChartConfig = ({ data, name, color }) => ({
        name,
        x: data.map((item) => item.date),
        type: 'line',
        line: {
            color,
            width: 2,
        }
    });

    /**
     * Normalizes a timeSeries' performance and converts it for plotly
     * @param {{x: Date, y: Number}[]} data 
     * @param {string} name 
     * @returns {type: string, x: Date[], y: Number[]}
     */
    const getPlotlyPerformance = ({ data, name, color }) => {
        const normalized = getNormalizedAsSeries(data.map((item) => item.value))
        return {
            ...getChartConfig({ data, name, color }),
            y: normalized,
        };
    };

    /**
     * Gets relative drawodowns for a series and formats them for Plotly
     * @param {{x: Date, y: Number}[]} data
     * @param {string} name 
     * @returns {type: string, x: Date[], y: Number[]}
     */
     const getPlotlyDrawdowns = ({ data, name, color }) => {
        const drawdowns = getRelativeDrawdownAsSeries(data.map((item) => item.value));
        return {
            ...getChartConfig({ data, name, color }),
            yaxis: 'y2',
            y: drawdowns,
        };
    }

    const props = defineProps({
        timeSeries: {
            type: Array,
            required: true,
        }
    });

    const chartContainer = ref(null);

    // When container is ready, create the chart
    watchEffect(async () => {
        if (chart) Plotly.purge(chart);
        const container = unref(chartContainer);
        if (container === null) {
            console.log('Chart container not ready');
            return;
        }
        console.log('Update chart for %d timeSeries in %o', props.timeSeries.length, container);

        const visibleTimeSeries = props.timeSeries.filter((item) => item.visible);
        const performances = visibleTimeSeries.map((series) => getPlotlyPerformance(series));
        dradowns = visibleTimeSeries.map((series) => getPlotlyDrawdowns(series));
        console.log('dds', dradowns);
        const dataForCharts = [...performances, ...dradowns];
        console.log('perf', performance, 'dd', dradowns);
        const chartResult = createChart({ container, data: dataForCharts });
        Plotly = chartResult.plotly;
        chart = await chartResult.chart;
        console.log('chart is now', chart);
    });

    window.addEventListener('resize', () => {
        // Woohoo: This seems to be the only working solution: First, set height/width to 0 in
        // order to enable a size *reduction* (offsetWidth will always at least be the plot's
        // previous size), only then manually measure out the container and use those sizes
        // for Plotly
        const container = unref(chartContainer);
        console.log('relayout', container);
        Plotly.relayout(container, {
            height: 0,
            width: 0,
        });
        Plotly.relayout(container, {
            height: container.offsetHeight,
            width: container.offsetWidth,
        });
    });

</script>

<template>
    <div ref="chartContainer" />
</template>