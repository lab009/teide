import createAction, { mergeOptions } from '../createAction'

it('createAction should exist', () => {
  expect(createAction).toBeTruthy()
})

it('mergeOptions should exist', () => {
  expect(mergeOptions).toBeTruthy()
})

it('mergeOptions should merge correctly', () => {
  const defaults = {
    foo: 1,
    bar: 2,
  }
  const options = {
    foo: 3,
  }

  expect(mergeOptions(defaults, options)).toEqual({ foo: 3, bar: 2 })
})

it('mergeOptions should apply defaults and convert non reserved functions to values', () => {
  const defaults = {
    collection: false,
    endpoint: params => `${params.string}/test`,
    query: () => ({ test: 123 }),
  }
  const opt = {
    onResponse: () => 'response',
    onError: () => 'error',
    onConfig: () => 'config',
    method: 'GET',
    params: {
      string: '/other',
    },
    query: { testing: 'abc' },
  }

  const result = mergeOptions(defaults, opt)
  const expected = {
    ...opt,
    endpoint: '/other/test',
    collection: false,
    query: {
      test: 123,
      testing: 'abc',
    },
  }

  expect(result).toEqual(expected)
})
