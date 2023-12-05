<script setup>
    import { watchEffect, ref, unref } from 'vue';
    import createChart from '../helpers/createChart';

    let chart;

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
        const dataForCharts = props.timeSeries
            .filter((item) => item.visible)
            .map((item) => ({
                label: item.name,
                data: item.data.map((entry) => ({
                    x: entry.date.toISOString(),
                    y: entry.value,
                }))
            }));
        console.log('Data for charts', dataForCharts);
        chart = createChart({ container, data: dataForCharts });
    });

</script>

<template>
    <canvas ref="chartContainer"></canvas>
</template>