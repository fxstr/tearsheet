<script setup>
    import {computed } from 'vue';

    const props = defineProps({
        values: {
            type: Object,
            required: true,
        },
        size: {
          type: String,
          // Valid are 'large' and 'regular'
          default: 'regular',
        },
        indicator: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        format: {
          type: Function,
          default: (value) => value,
        },
        abbreviation: {
          type: String,
          default: '',
        }
    });
    const isLarge = computed(() => {
      return props.size === 'large';
    })
</script>

<template>
    <tr class="{ }">
        <td :class="{ 'is-size-5 is-sticky-table-head has-text-weight-semibold has-background-white	': isLarge, 'is-sticky-table-head has-background-white	': !isLarge }">
            <abbr v-if="props.abbreviation" :title="props.name">
                {{ props.abbreviation }}
            </abbr>
            <span v-if="!props.abbreviation">
                {{ props.name }}
            </span>
        </td>
        <td
			      v-for="entry in values"
			      :class="{ 'is-size-5 has-text-weight-semibold is-family-monospace has-text-right has-background-white	': isLarge, 'is-family-monospace pl-4 has-text-right has-background-white	': !isLarge }"
		    >
            {{ format(entry[indicator]) }}
        </td>
    </tr>
</template>