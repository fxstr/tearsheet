<script setup>
    import { computed } from 'vue';
    import PerformanceTableRow from './PerformanceTableRow.vue';

    const props = defineProps({
        timeSeries: {
          type: Array,
          required: true,
        }
    });
    const visibleTimeSeries = computed(() => {
        return props.timeSeries.filter(entry => entry.visible);
    });
    const indicators = [{
      indicator: 'linRegCAGR',
      name: 'CAGR based on linear regression',
      abbreviation: 'LinReg CAGR',
      size: 'large',
      format: (value) => `${(value * 100).toFixed(1)}%`,
    }, {
      indicator: 'maxDD',
      name: 'Maximum Drawdown',
      abbreviation: 'Max. DD',
      size: 'large',
      format: (value) => `${(value * 100).toFixed(1)}%`,
    }, {
      indicator: 'robustRatio',
      name: 'Robust Ratio (LinReg CAGR * (1 - max. DD))',
      abbreviation: 'Robust',
      size: 'large',
      format: (value) => `${(value * 100).toFixed(1)}`,
    }, {
      indicator: 'cagr',
      name: 'Compound Annual Growth Rate',
      abbreviation: 'CAGR',
      format: (value) => `${(value * 100).toFixed(1)}%`,
    }, {
      indicator: 'calmar',
      abbreviation: 'Calmar',
      name: 'Calmar (CAGR 1 yr / Max. DD)',
      format: (value) => value.toFixed(1),
    }, {
      indicator: 'sortino',
      name: 'Sortino',
      format: (value) => value.toFixed(1),
    }, {
      indicator: 'stdDev',
      name: 'Standard Deviation',
      abbreviation: 'Std Dev',
      format: (value) => value.toFixed(1),
    }, {
      indicator: 'sharpe',
      name: 'Sharpe',
      format: (value) => value.toFixed(1),
    }, {
      indicator: 'relativeTimeInMarket',
      name: 'In Market (approx.)',
      format: (value) => `${(value * 100).toFixed(0)}%`,
    }];
</script>

<template>
    <table class="table is-hoverable">
        <thead>
            <tr>
                <th />
                <th
                    v-for="entry in visibleTimeSeries"
                    :key="entry.id"
                >
                    {{ entry.name }}
                </th>
            </tr>
        </thead>
        <tbody>
            <!-- Go through all indicators, print one per row -->
            <template v-for="indicator in indicators">
                <PerformanceTableRow
					v-bind="indicator"
					:values="visibleTimeSeries"
				/>
            </template>
        </tbody>
    </table>
</template>