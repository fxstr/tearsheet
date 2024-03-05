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
    <td :class="{ 'is-size-5 has-text-weight-semibold': isLarge }">
      <abbr v-if="props.abbreviation" :title="props.name">
        {{ props.abbreviation }}
      </abbr>
      <span v-if="!props.abbreviation">
        {{ props.name }}
      </span>
    </td>
    <td v-for="entry in values" :class="{ 'is-size-5 has-text-weight-semibold is-family-monospace has-text-right': isLarge, 'is-family-monospace pl-4 has-text-right': !isLarge }">
      {{ format(entry[indicator]) }}
    </td>
  </tr>
</template>