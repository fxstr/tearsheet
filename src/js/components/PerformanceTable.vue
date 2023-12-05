<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        timeSeries: Array,
    });
    const visibleTimeSeries = computed(() => {
        return props.timeSeries.filter(entry => entry.visible);
    });
</script>

<template>
    <table class="table is-hoverable">
        <thead>
            <tr>
                <th></th>
                <th v-for="entry in visibleTimeSeries">{{ entry.name }}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="is-size-5 has-text-weight-semibold"><abbr title="Compount Annually Growth Rate">CAGR</abbr></td>
                <td v-for="entry in visibleTimeSeries" class="is-size-5 has-text-weight-semibold is-family-monospace has-text-right">{{  (entry.cagr * 100).toFixed(2) }}%</td>
            </tr>
            <tr>
                <td class="is-size-5 has-text-weight-semibold"><abbr title="Maximum Drawdown">Max. DD</abbr></td>
                <td v-for="entry in visibleTimeSeries" class="is-size-5 has-text-weight-semibold is-family-monospace has-text-right">{{  (entry.maxDD * 100).toFixed(2) }}%</td>
            </tr>
            <tr>
                <td>Calmar (CAGR / Max. DD)</td>
                <td v-for="entry in visibleTimeSeries" class="is-family-monospace pl-4 has-text-right">{{  entry.calmar.toFixed(2) }}</td>
            </tr>
            <tr>
                <td class="pt-6">Sortino</td>
                <td v-for="entry in visibleTimeSeries" class="is-family-monospace pl-4 pt-6 has-text-right">{{  entry.sortino.toFixed(2) }}</td>
            </tr>
        </tbody>
    </table>
</template>