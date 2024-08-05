<script setup>
    import { watch, inject, computed } from 'vue';
    import readFiles from '../helpers/readFiles';
    import modifySearchParams from '../helpers/modifySearchParams';

    const notifications = inject('notifications');

    const props = defineProps({
        timeSeriesCollection: {
            type: Object,
            required: true,
        },
        isAddSeriesBoxVisible: Boolean,
    });
    const emit = defineEmits(['fileUploaded', 'fileUrlAdded', 'changeAddSeriesBoxVisibility']);
    
    const hasAtLeastOneTimeSeries = computed(() => (
        props.timeSeriesCollection.timeSeries.length > 0
    ));

    const handleUpload = async (event) => {
        try {
            const allContent = await readFiles(event.target);
            allContent.forEach((fileContent) => {
                props.timeSeriesCollection.addFromCSV(fileContent);
            });
            emit('fileUploaded');
            notifications.add(`Successfully added file.`, 'info');
        } catch (err) {
            notifications.add(`Could not read file: ${err.message}`, 'error');
        }
    };

    // If box becomes visible, scroll to it to make sure user notice it
    watch(
        () => props.isAddSeriesBoxVisible,
        (newValue) => {
            if (newValue) window.scrollTo(0, 0);
        },
        // For whatever reason, this does not work without immediate
        { immediate: true },
    );

    /**
     * Persist file URLs in the URL's hash in order to make them shareable/persistable; use hash
     * (instead of search) to prevent reloads.
     */
    const handleAddURL = (event) => {
        const formData = new FormData(event.target);
        const fileURL = formData.get('fileURL');
        modifySearchParams('file-url', fileURL);
        emit('fileUrlAdded', fileURL);
    };

</script>

<template>
    <div class="box">
        <div class="content">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <h1 class="title is-1">
                            Your Online Tearsheet
                        </h1>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <!-- As long as not Time series was added (especially in the initial
                            state) let users not close the add time series box -->
                        <button
                            class="delete"
                            @click="$emit('changeAddSeriesBoxVisibility', false)"
                            v-if="hasAtLeastOneTimeSeries"
                        />
                    </div>
                </div>
            </div>
            <p>Add your trading results to get insights into their performance:</p>
            <div class="columns mb-6 mt-6">
                <div class="column">
                    <div class="card has-background-info">
                        <div class="card-content has-text-white">
                            <div class="is-size-3">
                                Drop a CSV file
                            </div>
                            <p>on this window or upload:</p>
                            <div class="file">
                                <label class="file-label">
                                    <input
                                        class="file-input is-medium"
                                        type="file"
                                        @change="$event => handleUpload($event)"
                                    >
                                    <span class="file-cta">
                                        <span class="file-label">
                                            Choose a file…
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="column">
                    <div class="card has-background-info">
                        <form
                            class="card-content has-text-white"
                            @submit.prevent="handleAddURL"
                        >
                            <div class="is-size-3 mb-3">
                                Load CSV from URL
                            </div>

                            <div class="field has-addons">
                                <div class="control is-expanded">
                                    <input
                                        class="input is-medium"
                                        type="text"
                                        name="fileURL"
                                        placeholder="URL to CSV file"
                                    >
                                </div>
                                <div class="control">
                                    <button class="button is-link is-medium">
                                        Load
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="pt-5 has-text-grey notification">
                <h1>Instructions</h1>
                <p>Use the following structure for your CSV files:</p>
                <ul>
                    <li>The first column contains dates.</li>
                    <li>The subsequent columns contain one series per column.</li>
                    <li>A column's head will be used as the series' name.</li>
                    <li>Use <code>parameter=value</code> (with value being a number) in the head to compare series in a heatmap</li>
                </ul>
                <h4 class="mt-6">Example</h4>
                <table class="is-family-monospace has-text-weight-semibold">
                    <tr>
                        <tr>
                            <td>Date</td>
                            <td>fast=10, slow=50</td>
                            <td>fast=15, slow=75</td>
                        </tr>
                        <tr>
                            <td>2024-01-01</td>
                            <td>127</td>
                            <td>183</td>
                        </tr>
                        <tr>
                            <td>2024-01-02</td>
                            <td>129</td>
                            <td>181</td>
                        </tr>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>