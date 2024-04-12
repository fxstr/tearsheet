<!--
    Ddisplays a list of time series and allow the user to toggle their visibility.
-->
<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        timeSeries: {
            type: Array,
            required: true,
        },
        isAddSeriesBoxVisible: Boolean,
        fromDate: {
            type: String,
            default: null,
        },
        toDate: {
            type: String,
            default: null,
        },
    });
    const emit = defineEmits([
        'changeAddSeriesBoxVisibility',
        'update:toDate',
        'update:fromDate',
    ]);
    const doDatesOverlap = computed(
        () => props.fromDate && props.toDate
            && new Date(props.fromDate).getTime() >= new Date(props.toDate).getTime()
    );

</script>

<template>
    <h2 class="title is-5">
        Instruments
    </h2>
    <div class="field">
        <div
            v-for="series in timeSeries"
            :key="series.id"
            class="field"
        >
            <label class="checkbox">
                <input
                    v-model="series.visible"
                    type="checkbox"
                >
                {{ series.name }}
            </label>
        </div>
        <div class="field mt-6">
            <label class="label">From:</label>
            <input
                class="input"
                type="date"
                :value="fromDate"
                @input="emit('update:fromDate', $event.target.value)"
            >
        </div>
        <div class="field">
            <label class="label">To:</label>
            <input
                class="input"
                type="date"
                :value="toDate"
                @input="emit('update:toDate', $event.target.value)"
            >
        </div>
        <div
            v-if="doDatesOverlap"
            class="notification is-danger"
        >
            To date must be greater than from date.
        </div>
        <button
            class="button mt-6"
            @click="$emit('changeAddSeriesBoxVisibility', true)"
        >
            Add series …
        </button>
    </div>
</template>
