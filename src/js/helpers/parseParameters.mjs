/**
 * Takes a column name and parses out all parameters that take the form of key:value, e.g.
 * "instrument: ES with basePeriod=5 and factor:2" will become
 * new Map([['instrument', 'ES'], ['basePeriod', 5], ['factor', 2]] }
 * @param {String} columnName
 * @returns {Map}
 */
export default (columnName) => (
    [...columnName.matchAll(/(\w+)[:=](\d+(\.\d+)?)/g)]
        .reduce((previous, [all, variableName, number]) => (
            new Map([...previous, [variableName, parseFloat(number)]])
        ), new Map())
);
