
/**
 * Parameters of a backtest are a map (see parseParameters); stringify it and use <br> between
 * the params to make them better comparable
 * @param {Map} parameters
 * @param {String} divider
 * @returns {String}
 */
const stringifyParameters = (parameters, divider) => [...parameters]
    .map(([name, value]) => `${name}: ${value}`).join(divider)

/**
 * Return the best matching name for a backtest: If parameters exist, use them; if not, return
 * the backtest's name.
 * @param {Object} entry The backtest entry; valid keys are 'name' and 'parameters'
 * @param {String} divider The divider between the parameters
 * @returns {String}
 */
export default (entry, divider = ' ') => entry.parameters.size
    ? stringifyParameters(entry.parameters, divider)
    : entry.name;
