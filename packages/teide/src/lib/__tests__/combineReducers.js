import { Map } from 'immutable'

import createReducer from '../createReducer'
import combineReducers from '../combineReducers'

it('should combine and init two immutable reducer functions', () => {
  const firstReducer = createReducer({
    counter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  const secondReducer = createReducer({
    otherCounter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  const reducer = combineReducers(firstReducer, secondReducer)

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  const currState = reducer(undefined, { type: 'INIT' })

  expect(currState.toJS()).toEqual({
    counter: {
      count: 1,
    },
    otherCounter: {
      count: 1,
    },
  })
})

it('should combine and init an immutable reducer and an object', () => {
  const firstReducer = {
    increment: (v = 1, action = {}) => {
      if (action.type === 'increment') {
        return v + 1
      }
      return v
    },
  }
  const secondReducer = createReducer({
    counter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  const reducer = combineReducers(firstReducer, secondReducer)

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  const currState = reducer(undefined, { type: '@@redux/INIT' })

  expect(currState.toJS()).toEqual({
    counter: {
      count: 1,
    },
    increment: 1,
  })
})

it('should combine and init an immutable reducer and an object from existing state', () => {
  const firstReducer = {
    increment: (v = 1, action = {}) => {
      if (action.type === 'increment') {
        return v + 1
      }
      return v
    },
  }
  const secondReducer = createReducer({
    counter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  const reducer = combineReducers(firstReducer, secondReducer)
  let currState = Map()

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  currState = reducer(currState, { type: '@@redux/INIT' })

  expect(currState.toJS()).toEqual({
    counter: {
      count: 1,
    },
    increment: 1,
  })
})

it('should combine two immutable reducer functions', () => {
  const firstReducer = createReducer({
    counter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  const secondReducer = createReducer({
    otherCounter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  const reducer = combineReducers(firstReducer, secondReducer)
  let currState

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  currState = reducer(currState, { type: 'counter.increment' })
  currState = reducer(currState, { type: 'otherCounter.decrement' })

  expect(currState.toJS()).toEqual({
    counter: {
      count: 2,
    },
    otherCounter: {
      count: 0,
    },
  })
})

it('should combine an immutable reducer and an object', () => {
  const firstReducer = {
    increment: (v = 1, action = {}) => {
      if (action.type === 'increment') {
        return v + 1
      }
      return v
    },
  }
  const secondReducer = createReducer({
    otherCounter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })

  const reducer = combineReducers(firstReducer, secondReducer)
  let currState

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  currState = reducer(undefined, { type: 'increment' })
  expect(currState.toJS()).toEqual({
    increment: 2,
    otherCounter: {
      count: 1,
    },
  })

  currState = reducer(undefined, { type: 'otherCounter.decrement' })
  expect(currState.toJS()).toEqual({
    increment: 1,
    otherCounter: {
      count: 0,
    },
  })
})

it('should an immutable reducer and a plain function', () => {
  const firstReducer = (s = Map(), action = {}) => {
    if (action.type === 'increment') {
      if (s.has('laCuenta')) {
        return s.update('laCuenta', v => v + 1)
      }
      return s.set('laCuenta', 1)
    }
    return s
  }
  const secondReducer = createReducer({
    otherCounter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  const reducer = combineReducers(firstReducer, secondReducer)
  let currState

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  currState = reducer(currState, { type: 'increment' })
  currState = reducer(currState, { type: 'increment' })
  currState = reducer(currState, { type: 'otherCounter.decrement' })

  expect(currState.toJS()).toEqual({
    laCuenta: 2,
    otherCounter: {
      count: 0,
    },
  })
})

it('should a plain function and an immutable reducer', () => {
  const firstReducer = (s = Map(), action = {}) => {
    if (action.type === 'increment') {
      if (s.has('laCuenta')) {
        return s.update('laCuenta', v => v + 1)
      }
      return s.set('laCuenta', 1)
    }
    return s
  }
  const secondReducer = createReducer({
    otherCounter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  const reducer = combineReducers(secondReducer, firstReducer)
  let currState

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  currState = reducer(currState, { type: 'increment' })
  currState = reducer(currState, { type: 'increment' })
  currState = reducer(currState, { type: 'otherCounter.decrement' })

  expect(currState.toJS()).toEqual({
    laCuenta: 2,
    otherCounter: {
      count: 0,
    },
  })
})
