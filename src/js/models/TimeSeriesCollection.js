import { reactive, inject } from 'vue'
import TimeSeries from './TimeSeries';
import parseCSV from '../helpers/parseCSV.mjs';
import createPalette from 'google-palette';

const notification = inject('notifications');

/**
 * Model for a list/array/collection of TimeSeries
 */
export default class {

    /**
     * Create color palette with the total amount of expected colors we will use, then pass
     * them to the single time series entries. Docs see
     * https://mina86.github.io/palette.js/palette.js
     * Randomize palette as the original palette is rainbowy where similar colors are close to
     * each other
     */
    #colors = createPalette('tol-rainbow', 12)
        .map((item) => ({ item, order: Math.random() }))
        .sort((a, b) => a.order - b.order)
        .map(({ item }) => item);
    timeSeries = reactive([]);

    add(timeSeries) {
        this.timeSeries.push(timeSeries);
    }

    addFromCSV(text) {
        try {
            const parsed = parseCSV(text);
            parsed.forEach(({ data, name }) => {
                const transformedData = data.map(({ x, y }) => (
                    { date: new Date(x), value: parseFloat(y) }
                ));
                console.log('colors', this.#colors);
                const color = `#${this.#colors[this.timeSeries.length % this.#colors.length]}`;
                console.log('color', color);
                this.add(new TimeSeries({ data: transformedData, name, color }));
            });
        } catch (err) {
            console.error(err);
            notification.add(`Could not parse CSV file: ${err.message}`, 'error');
        }
    }

};
