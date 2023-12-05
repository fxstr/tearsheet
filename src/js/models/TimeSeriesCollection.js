import { reactive } from 'vue/dist/vue.esm-bundler'
import TimeSeries from './TimeSeries';
import parseCSV from '../helpers/parseCSV.mjs';

/**
 * Model for a list/array/collection of TimeSeries
 */
export default class {

    timeSeries = reactive([]);

    add(timeSeries) {
        this.timeSeries.push(timeSeries);
    }

    addFromCSV({ text } = {}) {
        const parsed = parseCSV(text);
        parsed.forEach(({ data, name }) => {
            const transformedData = data.map(({ x, y }) => (
                { date: new Date(x), value: parseFloat(y) }
            ));
            this.add(new TimeSeries({ data: transformedData, name }));
        });
    }

};
