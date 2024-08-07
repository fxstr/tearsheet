import { ref, computed } from 'vue';
import { 
    getMaxRelativeDrawdown,
    getCAGR,
    getCalmar,
    getStandardDeviation,
    getSortino,
    getSharpe,
    getLinearRegressionCAGR,
    getRobustRatio,
    getCumulativeReturn,
    getRelativeTimeInMarket,
} from 'portfolio-analysis';
import parseParameters from '../helpers/parseParameters';
import createId from '../helpers/createId';

const getValues = (data) => data.value.map(({ value }) => value);
const getDates = (data) => data.value.map(({ date }) => date);
/**
 * Returns a function that we'll use as a filter function later; checks if from/to date filter
 * exists and is valid and if yes, compares an entry of the timeSeries to it. We use a factory
 * function in order to reduce duplicate code.
 */
const createMatcher = (dateFilterValue, lowerFilter = true) => (
    (value) => {
        // There's no filter: return true
        if (!dateFilterValue) return true;
        const date = new Date(dateFilterValue);
        // Filter is invalid: Assume true
        if (Number.isNaN(date.getTime())) return true;
        return lowerFilter 
            ? value.date.getTime() > date.getTime()
            : value.date.getTime() < date.getTime();
    }
)


/**
 * Model for a TimeSeries
 */
export default class {
    /* type { date: Date, value: number }[] */
    data = [];

    id = createId();

    name = 'Unnamed';

    color = '#000000';

    visible = ref(true);

    #fromDateReference;

    #toDateReference;

    #originalData;

    /**
     * If the column name contains parameters (in the form of key:value), store them here. They're
     * mainly used to display heat maps across multiple TimeSeries.
     */
    parameters = new Map();


    /**
     * We can't define color in here because the whole palette needs to be generated beforehand
     * to ensure high contrast between different TimeSeries.
     * Assume that we get valid data (data validation is done in parseCSV).
     * @param {Object} args
     * @param {{ date: Date, value: Number }[]} args.data
     * @param {String} args.name
     * @param {String} args.color
     * @param {vue.Reference} args.fromDateReference
     * @param {vue.Reference} args.toDateReference
     */
    constructor({ data, name, color, toDateReference, fromDateReference } = {}) {
        this.#originalData = data;
        this.name = name;
        this.color = color;
        this.#fromDateReference = fromDateReference;
        this.#toDateReference = toDateReference;
        this.parameters = parseParameters(name);

        this.#setupComputedIndicators();
    }

    #setupComputedIndicators() {
        console.log('Start setting up indicators');
        this.data = computed(() => {
            const matchesFrom = createMatcher(this.#fromDateReference.value);
            const matchesTo = createMatcher(this.#toDateReference.value, false);
            const data = this.#originalData.filter((item) => matchesFrom(item) && matchesTo(item));
            return data;
        });

        this.cagr = computed(() => {
            const dates = getDates(this.data);
            return getCAGR(getValues(this.data), dates.at(0), dates.at(-1));
        });

        this.sortino = computed(() => (
            getSortino(getValues(this.data))
        ));

        this.maxDD = computed(() => (
            getMaxRelativeDrawdown(getValues(this.data))
        ));

        this.calmar = computed(() => {
            const dates = getDates(this.data);
            return getCalmar(getValues(this.data), dates.at(0), dates.at(-1));
        });

        this.sharpe = computed(() => {
            const dates = getDates(this.data);
            return getSharpe(getValues(this.data), dates.at(0), dates.at(-1));
        });

        this.linRegCAGR = computed(() => {
            const start = new Date().getTime();
            const result = getLinearRegressionCAGR(getValues(this.data), getDates(this.data))
            console.log('Time to calculate linRegCAGR:', new Date().getTime() - start);
            return result;
        });

        this.stdDev = computed(() => (
            getStandardDeviation(getValues(this.data))
        ));

        this.robustRatio = computed(() => (
            getRobustRatio(getValues(this.data), getDates(this.data))
        ));

        this.relativeTimeInMarket = computed(() => (
            getRelativeTimeInMarket(getValues(this.data))
        ));

        this.cumulativeReturn = computed(() => (
            getCumulativeReturn(getValues(this.data))
        ));
        console.log('Done setting up indicators');
    }
}
