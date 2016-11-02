import test from 'ava'

import createActions from '../src/lib/createActions'

test('should create from a flat string object', (t) => {
  const actions = createActions({
    one: 'one',
    two: 'two',
  }, (action) => {
    t.truthy(action)
  })
  t.truthy(actions.one)
  t.truthy(actions.two)

  t.deepEqual(actions.one(1), { type: 'one', payload: 1 })
  t.deepEqual(actions.two(2), { type: 'two', payload: 2 })
})

test('should create from a nested string object', (t) => {
  const actions = createActions({
    one: {
      half: 'one',
    },
    two: {
      half: 'two',
    },
  }, (action) => {
    t.truthy(action)
  })
  t.truthy(actions.one.half)
  t.truthy(actions.two.half)

  t.deepEqual(actions.one.half(1), { type: 'one', payload: 1 })
  t.deepEqual(actions.two.half(2), { type: 'two', payload: 2 })
})

test('should create from a flat function object', (t) => {
  const actions = createActions({
    one: () => ({}),
    two: () => ({}),
  }, (action) => {
    t.truthy(action)
  })
  t.truthy(actions.one)
  t.truthy(actions.two)

  t.deepEqual(actions.one(1), {})
  t.deepEqual(actions.two(2), {})
})
