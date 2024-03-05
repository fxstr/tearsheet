<script setup>
    import { computed } from 'vue';
    import PerformanceTableRow from './PerformanceTableRow.vue';

    const props = defineProps({
        timeSeries: Array,
    });
    const visibleTimeSeries = computed(() => {
        return props.timeSeries.filter(entry => entry.visible);
    });
    const indicators = [{
      indicator: 'cagr',
      size: 'large',
      name: 'Compound Annual Growth Rate',
      abbreviation: 'CAGR',
      format: (value) => `${(value * 100).toFixed(1)}%`,
    }, {
      indicator: 'maxDD',
      name: 'Maximum Drawdown',
      abbreviation: 'Max. DD',
      size: 'large',
      format: (value) => `${(value * 100).toFixed(0)}%`,
    }, {
      indicator: 'linRegCAGR',
      name: 'CAGR based on linear regression',
      abbreviation: 'LinReg CAGR',
      size: 'large',
      format: (value) => `${(value * 100).toFixed(1)}%`,
    }, {
      indicator: 'calmar',
      abbreviation: 'Calmar',
      name: 'Calmar (CAGR 1 yr / Max. DD)',
      size: 'regular',
      format: (value) => value.toFixed(1),
    }, {
      indicator: 'sortino',
      name: 'Sortino',
      size: 'regular',
      format: (value) => value.toFixed(1),
    }, {
      indicator: 'stdDev',
      name: 'Standard Dev',
      size: 'regular',
      format: (value) => value.toFixed(1),
    }, {
      indicator: 'sharpe',
      name: 'Sharpe',
      size: 'regular',
      format: (value) => value.toFixed(1),
    }]
</script>

<template>
  <table class="table is-hoverable">
    <thead>
      <tr>
        <th />
        <th v-for="entry in visibleTimeSeries">{{ entry.name }}</th>
      </tr>
    </thead>
    <tbody>
      <!-- Go through all indicators, print one per row -->
      <template v-for="indicator in indicators">
        <PerformanceTableRow v-bind="indicator" :values="visibleTimeSeries" />
      </template>
    </tbody>
  </table>
</template>