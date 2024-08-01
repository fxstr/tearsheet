<script setup>
    import { provide, ref, reactive } from 'vue';
    import TimeSeriesCollection from '../models/TimeSeriesCollection';
    import Notifications from './Notifications.vue';
    import Disclaimer from './Disclaimer.vue';
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

    const currentModalContent = ref(null);
    const setModalContent = (content) => {
        console.log('close');
        currentModalContent.value = content;
    }

    // Update date values when a user navigates back/forward
    window.addEventListener('popstate', updateDatesFromURL);
    // Update date values on looad
    updateDatesFromURL();
</script>

<template>
    <!-- Make sure FileDropHandler is the outermost component as it will get an inner glow
    when a file is hovered; it will be cut of if you don't. -->
    <FileDropHandler
        :time-series-collection="timeSeriesCollection"
        @file-uploaded="updateAddSeriesBoxVisibility(false)"
    >
        <Disclaimer
            v-if="currentModalContent === 'disclaimer'"
            @close-overlay="setModalContent(null)">
        </Disclaimer>
        <Notifications v-if="notifications.getAll().length > 0" />
        <DataFetcher
            :time-series-collection="timeSeriesCollection"
            :file-urls="fileURLs"
        />
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
                <!-- List with all instruments; if we use is-narrow, the column to the right with
                the performance results does not have a fixed with, table and/or chart will
                overflow without scrolling if they're too wide. -->
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
                <!-- Column with performance results -->
                <div class="column performance-container">
                    <h1 class="title">
                        Tear Sheet
                    </h1>
                    <div class="box mb-6">
                        <PerformanceChart :time-series="timeSeriesCollection.timeSeries" />
                    </div>
                    <div class="box performance-table-container">
                        <PerformanceTable :time-series="timeSeriesCollection.timeSeries" />
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container">
                <button
                    class="button"
                    @click="setModalContent('disclaimer')"
                >
                    Disclaimer
            </button>
            </div>
        </div>
    </FileDropHandler>
</template>
