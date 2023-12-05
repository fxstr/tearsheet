import { parse } from 'csv-parse/sync';

/**
 * Parses CSV content and returns in the format:
 * [{
 *    name: String,
 *    data: [{ x: Date, y: Number }, ...],
 * }]
 * @param {string} text         CSV content
 * @returns {object}            Parsed CSV content
 */
export default (text) => {
    const parsed = parse(text, { skip_empty_lines: true });
    const [head, ...body] = parsed;
    const colunNames = head.slice(1);
    const cols = colunNames.map((name, index) => ({
        name,
        data: body.map((row) => ({ x: new Date(row[0]), y: parseFloat(row[index + 1]) }))
    }));
    return cols;
}
