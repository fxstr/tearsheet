import parseParameters from './parseParameters';

test('parses parameters', () => {
    expect(parseParameters('')).toMatchObject({});
    // Single entry
    expect(parseParameters('a=4')).toEqual(new Map([['a', 4]]));
    // Multiple entries, no divider
    expect(parseParameters('a=4, b=3.4cde=5')).toEqual(new Map([['a', 4], ['b', 3.4], ['cde', 5]]));
    // Duplicate entries; lasst entry wins
    expect(parseParameters('a=4,a=3')).toEqual(new Map([['a', 3]]));
    // Non-number values
    expect(parseParameters('a=4,b=test=3')).toEqual(new Map([['a', 4], ['test', 3]]));
});