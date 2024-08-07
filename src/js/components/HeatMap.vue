<script setup>
    import { watchEffect, ref, unref } from 'vue';
    import Plotly from 'plotly.js-dist-min';

    const props = defineProps({
        timeSeriesCollection: {
            type: Object,
            required: true,
        }
    });
    const chartContainer = ref(null);
    // Dropdown values
    const xAxisParameter = ref(props.timeSeriesCollection.getAllParameters().at(0));
    const yAxisParameter = ref(props.timeSeriesCollection.getAllParameters().at(1));
    const color = ref('robustRatio');

    let chart;

    /* Only display the chart once the container is ready */
    watchEffect(async () => {
        // At least x-axis and color must be selected to draw the chart
        if (!xAxisParameter || !color) {
            if (chart) Plotly.purge(chart);
            return;
        }
        if (chart) Plotly.purge(chart);
        const container = unref(chartContainer);
        if (container === null) {
            console.log('HeatMap container not ready');
            return;
        }
        // Docs for the data structure: https://plotly.com/javascript/heatmaps/#annotated-heatmap
        const xValues = props.timeSeriesCollection.getAllVisibleValuesForParameter(xAxisParameter.value);
        const yValues = props.timeSeriesCollection.getAllVisibleValuesForParameter(yAxisParameter.value);
        console.log('y values', yValues);
        // Data for heatmap is one array per row; therefore, we must start with the y axis (=rows)
        const matrix = yValues.map((y) => (
            xValues.map((x) => (
                props.timeSeriesCollection.getTimeSeriesForParametersAndValues([
                    [xAxisParameter.value, x],
                    [yAxisParameter.value, y],
                ])[0]?.[color.value]
            ))
        ));


        var data = [
            {
                z: matrix,
                x: xValues,
                y: yValues,
                type: 'heatmap'
            }
        ];
        console.log('Data for HeatMap is', data);
        chart = Plotly.newPlot(container, data);        
    });

    window.addEventListener('resize', () => {
        // Woohoo: This seems to be the only working solution: First, set height/width to 0 in
        // order to enable a size *reduction* (offsetWidth will always at least be the plot's
        // previous size), only then manually measure out the container and use those sizes
        // for Plotly
        const container = unref(chartContainer);
        if (!container) return;
        console.log('container', container);
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
    <h3 class="title is-4">Heatmap</h3>
    <p v-if="props.timeSeriesCollection.getAllParameters().length === 0">
        To display a heatmap for your parameters, make sure that at least one parameter is present.
        To do so, name the columns in your CSV file accordingly
        (e.g. <code>param1=4, param2=2.4</code>).
    </p>
    <div v-else>
        <div class="field is-grouped is-grouped-multiline">
            <div class="control">
                <div class="select">
                    <select v-model="xAxisParameter">
                        <option v-for="parameter in props.timeSeriesCollection.getAllParameters()">
                            {{ parameter }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="control">
                <div class="select">
                    <select v-model="yAxisParameter">
                        <option v-for="parameter in props.timeSeriesCollection.getAllParameters()">
                            {{ parameter }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="control">
                <div class="select">
                    <select v-model="color">
                        <option value="robustRatio">Robust Ratio</option>
                    </select>
                </div>
            </div>
        </div>
        <div ref="chartContainer"></div>
    </div>
</template>