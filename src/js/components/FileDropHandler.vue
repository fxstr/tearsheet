<script setup>
    import { ref, inject } from 'vue';
    import readFiles from '../helpers/readFiles';

    const notifications = inject('notifications')
    const indicateDropTarget = ref(false);

    const props = defineProps({
        timeSeriesCollection: {
            type: Object,
            required: true,
        },
    });

    const emit = defineEmits('fileUploaded');

    const handleDragEnter = () => {
        indicateDropTarget.value = true;
    };

    const handleDragLeave = () => {
        indicateDropTarget.value = false;
    };

    const handleDrop = async (event) => {
        indicateDropTarget.value = false;
        const allContent = await readFiles(event.dataTransfer);
        allContent.forEach((fileContent) => {
            try {
                props.timeSeriesCollection.addFromCSV(fileContent);
                notifications.add('Successfully added CSV file');
            } catch (err) {
                notifications.add(`Could not add CSV file: ${err.message}`, 'error');
            }
        });
        emit('fileUploaded');
    };

    const handleDragOver = () => {
        indicateDropTarget.value = true;
    };
</script>

<template>
    <div
        :class="{ 'can-drop': indicateDropTarget, 'file-drop-handler': true}"
        @dragenter.prevent="handleDragEnter"
        @dragleave.prevent="handleDragLeave"
        @dragover.prevent="handleDragOver"
        @drop.prevent="handleDrop"
    >
        <slot>Loading Content …</slot>
    </div>
</template>

<style scoped>
    .file-drop-handler {
        min-height: 100vh;
    }

    .can-drop {
        box-shadow: inset 0 0 300px hsl(204, 86%, 53%);
    }
</style>
