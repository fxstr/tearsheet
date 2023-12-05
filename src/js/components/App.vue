<script setup>
    import TimeSeriesCollection from '../models/TimeSeriesCollection';
    import DataFetcher from './DataFetcher.vue';
    import Notifications from './Notifications.vue';
    import AddSeriesModal from './AddSeriesModal.vue';
    
    import TimeSeriesList from './TimeSeriesList.vue';
    import PerformanceChart from './PerformanceChart.vue';
    import PerformanceTable from './PerformanceTable.vue';

    const timeSeriesCollection = new TimeSeriesCollection();
</script>

<template>
    <Notifications></Notifications>
    <div class="section">
        <DataFetcher :timeSeriesCollection="timeSeriesCollection" />
        <div class="columns">
            <div class="column">
                <h1 class="title">
                    &nbsp; <!-- Just a spacer -->
                </h1>
                <TimeSeriesList :timeSeries="timeSeriesCollection.timeSeries" />
            </div>
            <div class="column is-four-fifths">
                <h1 class="title">
                    Tear Sheet
                </h1>
                <div class="box mb-6">
                    <PerformanceChart :timeSeries="timeSeriesCollection.timeSeries" />
                </div>
                <div class="box">
                    <PerformanceTable :timeSeries="timeSeriesCollection.timeSeries" />
                </div>
            </div>
        </div>

        <AddSeriesModal />

    </div>
</template>
