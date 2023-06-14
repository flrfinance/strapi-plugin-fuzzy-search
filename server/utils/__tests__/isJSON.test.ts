import { isJson, tryGetJson } from '../isJSON';

describe('isJSON', () => {
  test('can detect json', () => {
    expect(isJson('{"foo": "bar"}')).toBe(true);
  });

  test('can detect non-json', () => {
    expect(isJson('{"foo": "bar"')).toBe(false);
  });

  test('string is not json', () => {
    expect(isJson('foo')).toBe(false);
  });

  test('undefined is not json', () => {
    expect(isJson(undefined)).toBe(false);
  });

  test('null is not json', () => {
    expect(isJson(null)).toBe(false);
  });

  test('number is not json', () => {
    expect(isJson(1)).toBe(false);
  });

  test("object is not json", () => {
    expect(isJson({o : 1})).toBe(false);
  })

  test('try get json', () => {
    expect(tryGetJson('{"foo": "bar"}')).toEqual({ foo: 'bar' });
  });

  test('try get json returns null if not json', () => {
    expect(tryGetJson({o : 1})).toBe(null);
  })
});
