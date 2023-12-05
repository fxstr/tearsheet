<script setup>
    import CSVUpload from './CSVUpload.vue';
    import CSVURL from './CSVURL.vue';

    import { ref } from 'vue';
    let activeTab = ref(0);
</script>

<template>

    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add Series</p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                
                <div class="content pb-2">

                    <div class="tabs mb-6">
                        <ul class="ml-0 mt-0">
                            <li :class="{ 'is-active': activeTab == 0 }" @click="$event => activeTab = 0"><a>Upload</a></li>
                            <li :class="{ 'is-active': activeTab == 1 }" @click="$event => activeTab = 1"><a>Load from URL</a></li>
                        </ul>
                    </div>

                    <div :hidden="activeTab !== 0">
                        <CSVUpload />
                    </div>

                    <div :hidden="activeTab !== 1">
                        <CSVURL />
                    </div>

                </div>

            </section>
        </div>
    </div>

</template>