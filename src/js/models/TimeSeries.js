import { ref } from 'vue';
import { 
    getMaxRelativeDrawdown,
    getCAGR,
    getCalmar,
    getStandardDeviation,
    getSortino,
    getSharpe,
    getLinearRegressionCAGR,
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

    /**
     * We can't define color in here because the whole palette needs to be generated beforehand
     * and assuming it's final amout of items.
     * @param {Object} args
     * @param {{ date: Date, value: Number }[]} args.data
     * @param {String} args.name
     * @param {String} args.color
     */
    constructor({ data, name, color } = {}) {

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
        this.color = color || this.color;

        const values = data.map(({ value }) => value);
        const dates = data.map(({ date }) => date);
        const startDate = dates.at(0);
        const endDate = dates.at(-1);
        this.cagr = getCAGR(values, startDate, endDate);
        this.sortino = getSortino(values);
        this.maxDD = getMaxRelativeDrawdown(values);
        this.calmar = getCalmar(values, startDate, endDate);
        this.sharpe = getSharpe(values, startDate, endDate);
        this.linRegCAGR = getLinearRegressionCAGR(values, dates);
        this.stdDev = getStandardDeviation(values);

    }

}