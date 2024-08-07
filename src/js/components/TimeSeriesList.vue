<!--
    Displays a list of time series and allow the user to toggle their visibility.
-->
<script setup>
    import { computed } from 'vue';
    import formatName from '../helpers/formatName';

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

    const updateVisibilityOfAllTimeSeries = (value) => {
        props.timeSeries.forEach((series) => { series.visible = value; });
    };

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
            <label
                class="checkbox is-family-monospace has-text-weight-semibold"
            >
                <input
                    v-model="series.visible"
                    type="checkbox"
                >
                {{ formatName(series, ' · ') }}
            </label>
        </div>
    </div>

    <button class="button is-ghost" @click="updateVisibilityOfAllTimeSeries(false)">Select none</button>
    <button class="button is-ghost" @click="updateVisibilityOfAllTimeSeries(true)">Select all</button>

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
</template>
