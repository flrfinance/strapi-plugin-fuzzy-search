import isJSON from '../isJSON';

describe('isJSON', () => {
  test('can detect json', () => {
    expect(isJSON('{"foo": "bar"}')).toBe(true);
  });

  test('can detect non-json', () => {
    expect(isJSON('{"foo": "bar"')).toBe(false);
  });
});
