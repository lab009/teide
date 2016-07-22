import test from 'ava'
import { Map } from 'immutable'

import createReducer from '../src/lib/createReducer'
import combineReducers from '../src/lib/combineReducers'

test('should combine and init two immutable reducer functions', t => {
  const firstReducer = createReducer({
    counter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v),
    },
  })
  const secondReducer = createReducer({
    otherCounter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v),
    },
  })
  const reducer = combineReducers(firstReducer, secondReducer)
  let currState = undefined

  t.truthy(reducer)
  t.is(typeof reducer, 'function')

  currState = reducer(currState, { type: 'INIT' })

  t.deepEqual(currState.toJS(), {
    counter: {
      count: 1,
    },
    otherCounter: {
      count: 1,
    },
  })
})

test('should combine and init an immutable reducer and an object', t => {
  const firstReducer = createReducer({
    counter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v),
    },
  })
  const secondReducer = {
    increment: (v = 1, action = {}) => {
      if (action.type === 'increment') {
        return ++v
      }
      return v
    },
  }
  const reducer = combineReducers(firstReducer, secondReducer)
  let currState = undefined

  t.truthy(reducer)
  t.is(typeof reducer, 'function')

  currState = reducer(currState, { type: 'INIT' })

  t.deepEqual(currState.toJS(), {
    counter: {
      count: 1,
    },
    increment: 1,
  })
})

test('should combine and init an immutable reducer and an object from existing state', t => {
  const firstReducer = createReducer({
    counter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v),
    },
  })
  const secondReducer = {
    increment: (v = 1, action = {}) => {
      if (action.type === 'increment') {
        return ++v
      }
      return v
    },
  }
  const reducer = combineReducers(firstReducer, secondReducer)
  let currState = Map()

  t.truthy(reducer)
  t.is(typeof reducer, 'function')

  currState = reducer(currState, { type: 'INIT' })

  t.deepEqual(currState.toJS(), {
    counter: {
      count: 1,
    },
    increment: 1,
  })
})

test('should combine two immutable reducer functions', t => {
  const firstReducer = createReducer({
    counter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v),
    },
  })
  const secondReducer = createReducer({
    otherCounter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v),
    },
  })
  const reducer = combineReducers(firstReducer, secondReducer)
  let currState = undefined

  t.truthy(reducer)
  t.is(typeof reducer, 'function')

  currState = reducer(currState, { type: 'counter.increment' })
  currState = reducer(currState, { type: 'otherCounter.decrement' })

  t.deepEqual(currState.toJS(), {
    counter: {
      count: 2,
    },
    otherCounter: {
      count: 0,
    },
  })
})

test('should combine an immutable reducer and an object', t => {
  const firstReducer = {
    increment: (v = 1, action = {}) => {
      if (action.type === 'increment') {
        return ++v
      }
      return v
    },
  }
  const secondReducer = createReducer({
    otherCounter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v),
    },
  })
  const reducer = combineReducers(firstReducer, secondReducer)
  let currState = undefined

  t.truthy(reducer)
  t.is(typeof reducer, 'function')

  currState = reducer(currState, { type: 'increment' })
  currState = reducer(currState, { type: 'otherCounter.decrement' })

  t.deepEqual(currState.toJS(), {
    increment: 2,
    otherCounter: {
      count: 0,
    },
  })
})

test('should an immutable reducer and a plain function', t => {
  const firstReducer = (s = Map(), action = {}) => {
    if (action.type === 'increment') {
      if (s.has('laCuenta')) {
        return s.update('laCuenta', v => ++v)
      }
      return s.set('laCuenta', 1)
    }
    return s
  }
  const secondReducer = createReducer({
    otherCounter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v),
    },
  })
  const reducer = combineReducers(firstReducer, secondReducer)
  let currState = undefined

  t.truthy(reducer)
  t.is(typeof reducer, 'function')

  currState = reducer(currState, { type: 'increment' })
  currState = reducer(currState, { type: 'increment' })
  currState = reducer(currState, { type: 'otherCounter.decrement' })

  t.deepEqual(currState.toJS(), {
    laCuenta: 2,
    otherCounter: {
      count: 0,
    },
  })
})

test('should a plain function and an immutable reducer', t => {
  const firstReducer = (s = Map(), action = {}) => {
    if (action.type === 'increment') {
      if (s.has('laCuenta')) {
        return s.update('laCuenta', v => ++v)
      }
      return s.set('laCuenta', 1)
    }
    return s
  }
  const secondReducer = createReducer({
    otherCounter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v),
    },
  })
  const reducer = combineReducers(secondReducer, firstReducer)
  let currState = undefined

  t.truthy(reducer)
  t.is(typeof reducer, 'function')

  currState = reducer(currState, { type: 'increment' })
  currState = reducer(currState, { type: 'increment' })
  currState = reducer(currState, { type: 'otherCounter.decrement' })

  t.deepEqual(currState.toJS(), {
    laCuenta: 2,
    otherCounter: {
      count: 0,
    },
  })
})
