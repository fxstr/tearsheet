import { reactive, inject } from 'vue'
import TimeSeries from './TimeSeries';
import parseCSV from '../helpers/parseCSV.mjs';
import createPalette from 'google-palette';

/**
 * Model for a list/array/collection of TimeSeries
 */
export default class {

    #colors;
    #fromDateReference;
    #toDateReference;
    timeSeries = reactive([]);

    /**
     * @param {Object} args
     * @param {vue.Reference} args.fromDateReference
     * @param {vue.Reference} args.toDateReference
     */
    constructor({ fromDateReference, toDateReference } = {}) {
        this.#createColors();
        this.#fromDateReference = fromDateReference;
        this.#toDateReference = toDateReference;
    }

    /**
     * Create color palette with the total amount of expected colors we will use, then pass
     * them to the single time series entries. Docs see
     * https://mina86.github.io/palette.js/palette.js
     * Randomize palette as the original palette is rainbowy where similar colors are close to
     * each other
     */
    #createColors() {
        this.#colors = createPalette('tol-rainbow', 12)
            .map((item) => ({ item, order: Math.random() }))
            .sort((a, b) => a.order - b.order)
            .map(({ item }) => item);
    }

    #add(timeSeries) {
        this.timeSeries.push(timeSeries);
    }

    addFromCSV(text) {
        const parsed = parseCSV(text);
        console.log(parsed);
        parsed.forEach(({ data, name: columnName }) => {
            // Go through columns, transform data
            const transformedData = data.map(({ x, y }) => (
                { date: new Date(x), value: parseFloat(y) }
            ));
            const color = `#${this.#colors[this.timeSeries.length % this.#colors.length]}`;
            const timeSeries = new TimeSeries({
                data: transformedData,
                name: columnName,
                color,
                fromDateReference: this.#fromDateReference,
                toDateReference: this.#toDateReference,
            });
            this.#add(timeSeries);
        });
    }

};
