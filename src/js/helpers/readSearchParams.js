/**
 * @param {String} name
 * @returns {String[]}
 */
export default (name) => (
    new URLSearchParams(window.location.search).getAll(name)
);
