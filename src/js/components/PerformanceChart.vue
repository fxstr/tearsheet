<script setup>
    import { watchEffect, ref, unref } from 'vue';
    import createChart from '../helpers/createChart';
    import { getNormalizedAsSeries, getRelativeDrawdownAsSeries } from 'portfolio-analysis';

    let chart;

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
        timeSeries: Array,
    });

    const chartContainer = ref(null);

    // When container is ready, create the chart
    watchEffect(() => {
        if (chart) chart.destroy();
        const container = unref(chartContainer);
        if (container === null) {
            console.log('Chart container not ready');
            return;
        }
        console.log('Update chart for %d timeSeries in %o', props.timeSeries.length, container);

        const visibleTimeSeries = props.timeSeries.filter((item) => item.visible);
        performances = visibleTimeSeries.map((series) => getPlotlyPerformance(series));
        dradowns = visibleTimeSeries.map((series) => getPlotlyDrawdowns(series));
        console.log('dds', dradowns);
        const dataForCharts = [...performances, ...dradowns];
        console.log('perf', performance, 'dd', dradowns);
        chart = createChart({ container, data: dataForCharts });

    });

</script>

<template>
    <div ref="chartContainer"></div>
</template>