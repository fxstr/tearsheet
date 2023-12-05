<script>
    import { defineComponent } from 'vue';
    export default defineComponent({
        render: () => null,
    });
</script>

<script setup>

    const props = defineProps({
        timeSeriesCollection: Object,
    });

    const params = new URLSearchParams(window.location.search);
    const urls = (params.get('fetch') || '').split(/\s+/).filter((url) => url.length > 0);
    console.log('Fetch urls', urls);
    urls.forEach(async (url) => {
        const response = await fetch(url)
        const text = await response.text();
        console.log('Fetched', url, text.substring(0, 50));
        props.timeSeriesCollection.addFromCSV({ text, name: 'Any' });
    });

</script>

