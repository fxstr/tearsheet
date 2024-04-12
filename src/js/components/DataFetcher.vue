<script>
    import {
        inject,
        defineComponent,
        watch,
        computed,
    } from 'vue';

    export default defineComponent({
        render: () => null,
    });
</script>

<script setup>

    const notifications = inject('notifications');

    const props = defineProps({
        timeSeriesCollection: {
            type: Object,
            required: true,
        },
        fileUrls: {
            type: Array,
            required: true,
        },
    });

    const fetchData = (urls) => {
        urls.forEach(async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Could not load CSV file from URL ${url}: Invalid status ${response.status}.`);
                }
                const text = await response.text();
                notifications.add(`Successfully loaded file from ${url}`);
                props.timeSeriesCollection.addFromCSV(text);
            } catch (err) {
                notifications.add(`Could not load CSV file from URL ${url}: ${err}.`, 'error');
            }
        });
    };

    // Ha. https://stackoverflow.com/questions/62729380/vue-watch-outputs-same-oldvalue-and-newvalue
    const fileURLsToWatch = computed(() => ([...props.fileUrls]));

    watch(
        fileURLsToWatch,
        (newURLs, oldURLs = []) => {
            const addedURLs = newURLs.filter((url) => !oldURLs.includes(url));
            fetchData(addedURLs);
        },
        { immediate: true },
    );

</script>
