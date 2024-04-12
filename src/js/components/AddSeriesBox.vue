<script setup>
    import { watch, inject } from 'vue';
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
                        <button
                            class="delete"
                            @click="$emit('changeAddSeriesBoxVisibility', false)"
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
                <p>Make sure your CSV is structured as follows:</p>
                <ul>
                    <li>The first column should contain dates</li>
                    <li>The subsequent columns may contain one series per column</li>
                    <li>A column's head will be used as the serie's name</li>
                </ul>
            </div>
        </div>
    </div>
</template>