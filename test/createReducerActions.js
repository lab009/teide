import test from 'ava'
import { Map } from 'immutable'

import createReducerActions from '../src/lib/createReducerActions'

test('should create actions for a flat reducer', t => {
  const reducer = {
    initialState: Map({ count: 1 }),
    increment: (v) => v.update('count', v => ++v),
    decrement: (v) => v.update('count', v => --v),
  }
  const actions = createReducerActions(reducer)

  t.truthy(actions.increment)
  t.truthy(actions.decrement)

  t.deepEqual(actions.increment(), { type: 'increment' })
  t.deepEqual(actions.decrement(), { type: 'decrement' })
  t.deepEqual(actions.increment(1), { type: 'increment', payload: 1 })
  t.deepEqual(actions.decrement(1), { type: 'decrement', payload: 1 })
})

test('should create actions for a nested reducer', t => {
  const reducer = {
    counter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v),
    },
  }
  const actions = createReducerActions(reducer)

  t.truthy(actions.counter.increment)
  t.truthy(actions.counter.decrement)

  t.deepEqual(actions.counter.increment(), { type: 'counter.increment' })
  t.deepEqual(actions.counter.decrement(), { type: 'counter.decrement' })
  t.deepEqual(actions.counter.increment(1), { type: 'counter.increment', payload: 1 })
  t.deepEqual(actions.counter.decrement(1), { type: 'counter.decrement', payload: 1 })
})

test('should create actions for a really nested reducer', t => {
  const reducer = {
    yo: {
      counter: {
        initialState: Map({ count: 1 }),
        increment: (v) => v.update('count', v => ++v),
        decrement: (v) => v.update('count', v => --v),
      },
    },
  }
  const actions = createReducerActions(reducer)

  t.truthy(actions.yo.counter.increment)
  t.truthy(actions.yo.counter.decrement)

  t.deepEqual(actions.yo.counter.increment(), { type: 'yo.counter.increment' })
  t.deepEqual(actions.yo.counter.decrement(), { type: 'yo.counter.decrement' })
  t.deepEqual(actions.yo.counter.increment(1), { type: 'yo.counter.increment', payload: 1 })
  t.deepEqual(actions.yo.counter.decrement(1), { type: 'yo.counter.decrement', payload: 1 })
})
