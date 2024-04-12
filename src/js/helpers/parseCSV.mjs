import { parse } from 'csv-parse/sync';

/**
 * Parses CSV content and returns in the format:
 * [{
 *    name: String,
 *    data: [{ x: Date, y: Number }, ...],
 * }]
 * @param {string} text         CSV content
 * @returns {{name: string, data: { x: Date, y: number }[]}[]}    Parsed CSV content
 */
export default (text) => {
    const parsed = parse(text, { skip_empty_lines: true });
    const [head, ...body] = parsed;
    // We assume that the first column contains the date
    const colunNames = head.slice(1);
    const cols = colunNames.map((columnName, columnIndex) => ({
        name: columnName,
        data: body.map((row, rowIndex) => {
            const date = new Date(row[0]);
            if (Number.isNaN(date.getTime())) {
                throw new Error(`Expected row ${rowIndex} (0-based) of first column to contain a valid date, got ${row[0]} instead.`);
            }
            const value = parseFloat(row[columnIndex + 1]);
            if (Number.isNaN(value)) {
                throw new Error(`Expected row ${rowIndex} (0-based) of column ${columnName} to contain a valid number, got ${row[columnIndex + 1]} instead.`);
            }
            return { x: date, y: value }
        }),
    }));
    return cols;
};
