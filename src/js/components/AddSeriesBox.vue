<script setup>
    import readFiles from '../helpers/readFiles';

    const props = defineProps(['timeSeriesCollection']);

    const handleUpload = async (event) => {
        const allContent = await readFiles(event.target);
        for (const fileContent of allContent) {
            console.log('fc', fileContent);
            props.timeSeriesCollection.addFromCSV(fileContent);
        }
    };

    /**
     * Persist file URLs in the URL's hash in order to make them shareable/persistable; use hash
     * (instead of search) to prevent reloads.
     */
    const handleAddURL = (event) => {
        const input = event.currentTarget.closest('form').querySelector('input[type=\'text\']');
        const url = input.value;
        console.log('Add', url);
        // Add leading space if search params exist
        const hasLocation = window.location.hash !== '';
        window.location.hash += `${hasLocation ? ' ' : ''}${url}`;
    };

</script>

<template>

    <div class="box">
        <div class="content">
            <h1 class="title is-1">Your Online Tearsheet</h1>
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
                                        name="resume"
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
                        <form class="card-content has-text-white" @submit.prevent="handleAddURL">
                            <div class="is-size-3 mb-3">
                                Load CSV from URL
                            </div>

                            <div class="field has-addons">
                                <div class="control is-expanded">
                                    <input class="input is-medium" type="text" placeholder="URL to CSV file">
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