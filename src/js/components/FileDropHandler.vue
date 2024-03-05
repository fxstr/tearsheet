<script setup>
    import { ref } from 'vue';
    import readFiles from '../helpers/readFiles';

    let indicateDropTarget = ref(false);

    const props = defineProps(['timeSeriesCollection']);

    const handleDragEnter = () => {
        indicateDropTarget.value = true;
    };

    const handleDragLeave = () => {
        indicateDropTarget.value = false;
    };

    const handleDrop = async (event) => {
        indicateDropTarget.value = false;
        const allContent = await readFiles(event.dataTransfer);
        for (const fileContent of allContent) {
            props.timeSeriesCollection.addFromCSV(fileContent);
        }
    };

    const handleDragOver = () => {
        indicateDropTarget.value = true;
    };
</script>

<template>
    <div
        :class="{ 'can-drop': indicateDropTarget }"
        @dragenter.prevent="handleDragEnter"
        @dragleave.prevent="handleDragLeave"
        @dragover.prevent="handleDragOver"
        @drop.prevent="handleDrop"
    >
        <slot>Loading Content …</slot>
    </div>
</template>