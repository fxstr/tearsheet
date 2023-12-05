import parseCSV from './parseCSV.mjs';

test('returns object', () => {
    const input = `
"date","SPY","ES"
"2023-01-01","13.2","12.7"
"2023-01-03","13.4","12.1"
`;
    const result = parseCSV(input);
    expect(result).toEqual([
        {
            name: 'SPY',
            data: [
                { x: new Date('2023-01-01'), y: 13.2 },
                { x: new Date('2023-01-03'), y: 13.4 },
            ],
        }, {
            name: 'ES',
            data: [
                { x: new Date('2023-01-01'), y: 12.7 },
                { x: new Date('2023-01-03'), y: 12.1 },
            ],
        }
    ]);
});
