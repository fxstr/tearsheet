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

    /**
     * Returns the names of all timeSeries' parameters (taken from their column names)
     * @returns {String[]}
     */
    getAllParameters() {
        return [...this.timeSeries.reduce((previous, timeSeries) => (
            new Set([...previous, ...timeSeries.parameters.keys()])
        ), new Set())];
    }

    /**
     * Returns all values for a given parameter, as long as they belong to a visible timeSeries,
     * sorted ascending
     * @param {String} parameterName - Name of the parameter, see @method getAllParameters
     * @return {Float[]}
     */
    getAllVisibleValuesForParameter(parameterName) {
        return [...this.timeSeries.reduce((previous, timeSeries) => {
            if (!timeSeries.visible) return previous;
            return new Set([...previous, timeSeries.parameters.get(parameterName)])
        }, new Set())].sort((a, b) => a - b);
    }

    /**
     * Returns all timeSeries that match with a given parameter set
     * @param {[string, float][]} parameterValueSets - Array of tuples, where the first element is
     * the parameter name and the second element, e.g. [['base', 5], ['factor', 2]]
     * @returns {TimeSeries[]}
     */
    getTimeSeriesForParametersAndValues(parameterValueSets) {
        console.log('parameterValueSets', parameterValueSets);
        return this.timeSeries.filter((timeSeries) => (
            parameterValueSets.every(([parameterName, value]) => (
                timeSeries.parameters.get(parameterName) === value
            ))
        ));
    }

};
