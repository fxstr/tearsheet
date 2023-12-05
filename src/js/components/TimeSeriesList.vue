<!--
    Ddisplays a list of time series and allow the user to toggle their visibility.
-->
<script setup>
    defineProps({
        timeSeries: Array,
    });
</script>

<template>
    <h2 class="title is-6">Instruments</h2>
    <div class="field">
        <div class="field" v-for="series in timeSeries">
            <label class="checkbox">
                <input type="checkbox" v-model="series.visible">
                {{ series.name }}
            </label>
        </div>
    </div>
</template>