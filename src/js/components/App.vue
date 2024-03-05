<script setup>
    import TimeSeriesCollection from '../models/TimeSeriesCollection';
    
    import Notifications from './Notifications.vue';
    import AddSeriesBox from './AddSeriesBox.vue';
    import FileDropHandler from './FileDropHandler.vue';
    import DataFetcher from './DataFetcher.vue';
    import TimeSeriesList from './TimeSeriesList.vue';
    import PerformanceChart from './PerformanceChart.vue';
    import PerformanceTable from './PerformanceTable.vue';

    const props = defineProps ({
        timeSeriesCollection: Object,
    });

    const timeSeriesCollection = new TimeSeriesCollection();
</script>

<template>
    <Notifications />
    <DataFetcher :timeSeriesCollection="timeSeriesCollection" />
    <FileDropHandler :timeSeriesCollection="timeSeriesCollection">
        <div class="section" v-if="timeSeriesCollection.timeSeries.length == 0">
            <div class="section">
                <div class="container">
                    <AddSeriesBox :timeSeriesCollection="timeSeriesCollection" />
                </div>
            </div>
        </div>
        <div class="section" v-if="timeSeriesCollection.timeSeries.length > 0">
            <div class="columns">
                <!-- List with all instruments -->
                <div class="column is-narrow">
                    <!-- Sticky does not work within flexbox child; use separate scroll
                            container -->
                    <div class="scroll-container mr-6">
                        <div class="is-sticky">
                            <h1 class="title">
                                &nbsp; <!-- Just a spacer to match the height of the neighboring H1-->
                            </h1>
                            <TimeSeriesList :timeSeries="timeSeriesCollection.timeSeries" />
                        </div>
                    </div>
                </div>
                <div class="column">
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

        </div>
    </FileDropHandler>
</template>
