<script setup>
    import { provide, ref, reactive } from 'vue';
    import TimeSeriesCollection from '../models/TimeSeriesCollection';
    import Notifications from './Notifications.vue';
    import NotificationCollection from '../models/NotificationCollection';
    import AddSeriesBox from './AddSeriesBox.vue';
    import FileDropHandler from './FileDropHandler.vue';
    import DataFetcher from './DataFetcher.vue';
    import TimeSeriesList from './TimeSeriesList.vue';
    import PerformanceChart from './PerformanceChart.vue';
    import PerformanceTable from './PerformanceTable.vue';
    import modifySearchParams from '../helpers/modifySearchParams';
    import readSearchParams from '../helpers/readSearchParams';

    const notifications = new NotificationCollection();
    provide('notifications', notifications);

    const isAddSeriesBoxVisible = ref(true);
    const updateAddSeriesBoxVisibility = (value) => { isAddSeriesBoxVisible.value = value; };

    const fileURLs = reactive(readSearchParams('file-url'));
    // If there's an file passed through the URL, hide the add series box
    if (fileURLs.length) isAddSeriesBoxVisible.value = false;
    const handleFileURLAdded = (url) => {
        updateAddSeriesBoxVisibility(false);
        fileURLs.push(url);
    };

    const fromDate = ref(readSearchParams('from'));
    const toDate = ref(readSearchParams('to'));
    // Updates model from URL
    const updateDatesFromURL = () => {
        toDate.value = readSearchParams('to')[0] ?? null;
        fromDate.value = readSearchParams('from')[0] ?? null;
    };
    const updateDate = (type, value) => {
        // Propagate values to URL
        modifySearchParams(type, value, true);
        // Then update values from URL (DRY; we need this function in other places as well)
        updateDatesFromURL();
    };
    const handleUpdateToDate = (value) => updateDate('to', value);
    const handleUpdateFromDate = (value) => updateDate('from', value);

    const timeSeriesCollection = new TimeSeriesCollection({
        fromDateReference: fromDate,
        toDateReference: toDate,
    });

    // Update date values when a user navigates back/forward
    window.addEventListener('popstate', updateDatesFromURL);
    // Update date values on looad
    updateDatesFromURL();
</script>

<template>
    <Notifications v-if="notifications.getAll().length > 0" />
    <DataFetcher
        :time-series-collection="timeSeriesCollection"
        :file-urls="fileURLs"
    />
    <FileDropHandler
        :time-series-collection="timeSeriesCollection"
        @file-uploaded="updateAddSeriesBoxVisibility(false)"
    >
        <div
            v-if="isAddSeriesBoxVisible"
            class="section"
        >
            <div class="container">
                <AddSeriesBox
                    :time-series-collection="timeSeriesCollection"
                    :is-add-series-box-visible="isAddSeriesBoxVisible"
                    @file-url-added="handleFileURLAdded"
                    @file-uploaded="updateAddSeriesBoxVisibility(false)"
                    @change-add-series-box-visibility="updateAddSeriesBoxVisibility"
                />
            </div>
        </div>
        <div
            v-if="timeSeriesCollection.timeSeries.length > 0"
            class="section"
        >
            <div class="columns">
                <!-- List with all instruments -->
                <div class="column is-narrow">
                    <!-- Sticky does not work within flexbox child; use separate scroll
                            container -->
                    <div class="scroll-container mr-6">
                        <div class="is-sticky">
                            <h1 class="title">
                                <!-- Just a spacer to match the height of the neighboring H1-->
                                &nbsp;
                            </h1>
                            <TimeSeriesList
                                :time-series="timeSeriesCollection.timeSeries"
                                :is-add-series-box-visible="isAddSeriesBoxVisible"
                                :from-date="fromDate"
                                :to-date="toDate"
                                @update:from-date="handleUpdateFromDate"
                                @update:to-date="handleUpdateToDate"
                                @change-add-series-box-visibility="updateAddSeriesBoxVisibility"
                            />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <h1 class="title">
                        Tear Sheet
                    </h1>
                    <div class="box mb-6">
                        <PerformanceChart :time-series="timeSeriesCollection.timeSeries" />
                    </div>
                    <div class="box">
                        <PerformanceTable :time-series="timeSeriesCollection.timeSeries" />
                    </div>
                </div>
            </div>
        </div>
    </FileDropHandler>
</template>
