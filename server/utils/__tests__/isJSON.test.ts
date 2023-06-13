import isJSON from '../isJSON';

describe('isJSON', () => {
  test('can detect json', () => {
    expect(isJSON('{"foo": "bar"}')).toBe(true);
  });

  test('can detect non-json', () => {
    expect(isJSON('{"foo": "bar"')).toBe(false);
  });

  test('string is not json', () => {
    expect(isJSON('foo')).toBe(false);
  });

  test('undefined is not json', () => {
    expect(isJSON(undefined)).toBe(false);
  });

  test('null is not json', () => {
    expect(isJSON(null)).toBe(false);
  });

  test('number is not json', () => {
    expect(isJSON(1)).toBe(false);
  });
});
