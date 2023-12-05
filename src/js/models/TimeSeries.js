import { ref } from 'vue';
import { 
    getMaxAsSeries,
    getRelativeDrawdownAsSeries,
    getMaxRelativeDrawdown,
    getRelativeChangeAsSeries,
    getAverage,
    getRelativeTimeInMarket,
    getCAGR,
    getCalmar,
    getSortino,
} from 'portfolio-analysis'

/**
 * Model for a TimeSeries
 */
export default class {
    
    // { date: Date, value: number }[]
    data = [];
    name = 'Unnamed'
    color = '#000000'
    visible = ref(true)

    constructor({ data, name } = {}) {

        const validDate = item => Object.hasOwnProperty.call(item, 'date') && 
            item.date instanceof Date;
        const validNumber = item => Object.hasOwnProperty.call(item, 'value') && 
            typeof item.value === 'number';

        if (!Array.isArray(data) || !data.every(validDate) || !data.every(validNumber)) {
            throw new Error(`Invalid data ${JSON.stringify(data)} to construct a new TimeSeries; expected array of objects with { date: Date, value: number }.`);
        }

        if (typeof name !== 'string' || !name) {
            throw new Error(`Invalid name ${name} to construct a new TimeSeries; expected a non-empty string.`)
        }

        this.data = data;
        this.name = name;

        const values = data.map(({ value }) => value);
        const startDate = data.at(0).date;
        const endDate = data.at(-1).date;
        this.cagr = getCAGR(values, startDate, endDate);
        this.sortino = getSortino(values);
        this.maxDD = getMaxRelativeDrawdown(values);
        this.calmar = getCalmar(values, startDate, endDate);

    }

}