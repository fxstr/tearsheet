<script>
    import { defineComponent } from 'vue';
    export default defineComponent({
        render: () => null,
    });
</script>

<script setup>
    import { inject } from 'vue';
    const notifications = inject('notifications');
    console.log('nots', notifications);

    const props = defineProps({
        timeSeriesCollection: Object,
    });

    /**
     * Detects changes to the URL's hash and returns the newly added parts as array
     * @param {string} oldURL
     * @param {string} newURL
     * @returns {string[]}
     */
    const getChangedHashes = ({ oldURL, newURL }) => {
        const previousHashes = decodeURIComponent(new URL(oldURL).hash.substring(1)).split(' ');
        const newHashes = decodeURIComponent(new URL(newURL).hash.substring(1)).split(' ');
        const addedHashes = newHashes.filter((hash) => previousHashes.indexOf(hash) === -1);
        console.log('added', addedHashes);
        return addedHashes;
    };

    const handleChangedHashes = ({ oldURL, newURL }) => {
        const newURLs = getChangedHashes({ oldURL, newURL });
        console.log('newURLs', newURLs);
        newURLs.forEach(async (url) => {
            let response;
            try {
                response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Could not load CSV file from URL ${url}: Invalid status ${response.status}.`)
                }
                const text = await response.text();
                notifications.add(`Successfully loaded file from ${url}`);
                props.timeSeriesCollection.addFromCSV(text);
            } catch (err) {
                return notifications.add(`Could not load CSV file from URL ${url}: ${err}.`, 'error');
            }
        });
    };

    window.addEventListener('hashchange', handleChangedHashes);

    // Fetch existing URLs on init
    const currentURLWithoutHashes = new URL(window.location);
    currentURLWithoutHashes.hash = '';
    handleChangedHashes({ oldURL: currentURLWithoutHashes, newURL: window.location });

</script>
