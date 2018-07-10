import createReducer from '../createReducer'
import combineReducers from '../combineReducers'

const counterReducer = {
  initialState: { count: 1 },
  increment: (state) => { state.count += 1 },
  decrement: (state) => { state.count -= 1 },
}

it('should combine and init two reducer functions', () => {
  const firstReducer = createReducer({
    counter: counterReducer,
  })
  const secondReducer = createReducer({
    otherCounter: counterReducer,
  })
  const reducer = combineReducers(firstReducer, secondReducer)

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  const currState = reducer(undefined, { type: 'INIT' })

  expect(currState).toEqual({
    counter: {
      count: 1,
    },
    otherCounter: {
      count: 1,
    },
  })
})

it('should combine and init a reducer and an object', () => {
  const firstReducer = {
    increment: (state = 1, action = {}) => {
      if (action.type === 'increment') {
        return state + 1
      }
      return state
    },
  }
  const secondReducer = createReducer({
    counter: counterReducer,
  })
  const reducer = combineReducers(firstReducer, secondReducer)

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  const currState = reducer(undefined, { type: 'INIT' })

  expect(currState).toEqual({
    counter: {
      count: 1,
    },
    increment: 1,
  })
})

it('should combine and init a reducer and an object from existing state', () => {
  const firstReducer = {
    increment: (state = 1, action = {}) => {
      if (action.type === 'increment') {
        return state + 1
      }
      return state
    },
  }
  const secondReducer = createReducer({
    counter: counterReducer,
  })
  const reducer = combineReducers(firstReducer, secondReducer)

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  const currState = reducer({}, { type: 'INIT' })

  expect(currState).toEqual({
    counter: {
      count: 1,
    },
    increment: 1,
  })
})

it('should combine two reducer functions', () => {
  const firstReducer = createReducer({
    counter: counterReducer,
  })
  const secondReducer = createReducer({
    otherCounter: counterReducer,
  })
  const reducer = combineReducers(firstReducer, secondReducer)

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  let currState
  currState = reducer(currState, { type: 'counter.increment' })
  currState = reducer(currState, { type: 'otherCounter.decrement' })

  expect(currState).toEqual({
    counter: {
      count: 2,
    },
    otherCounter: {
      count: 0,
    },
  })
})

it('should combine a reducer and an object', () => {
  const firstReducer = {
    increment: (state = 1, action = {}) => {
      if (action.type === 'increment') {
        return state + 1
      }
      return state
    },
  }
  const secondReducer = createReducer({
    otherCounter: counterReducer,
  })

  const reducer = combineReducers(firstReducer, secondReducer)

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  let currState
  currState = reducer(currState, { type: 'increment' })
  currState = reducer(currState, { type: 'otherCounter.decrement' })
  expect(currState).toEqual({
    increment: 2,
    otherCounter: {
      count: 0,
    },
  })
})

it('should a reducer and a plain function', () => {
  const firstReducer = (state = {}, action = {}) => {
    if (action.type === 'increment') {
      if (state.laCuenta) {
        return { laCuenta: state.laCuenta + 1 }
      }
      return { laCuenta: 1 }
    }
    return state
  }
  const secondReducer = createReducer({
    otherCounter: counterReducer,
  })
  const reducer = combineReducers(firstReducer, secondReducer)

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  let currState
  currState = reducer(currState, { type: 'increment' })
  currState = reducer(currState, { type: 'increment' })
  currState = reducer(currState, { type: 'otherCounter.decrement' })

  expect(currState).toEqual({
    laCuenta: 2,
    otherCounter: {
      count: 0,
    },
  })
})

it('should a plain function and a reducer', () => {
  const firstReducer = (state = {}, action = {}) => {
    if (action.type === 'increment') {
      if (state.laCuenta) {
        return { laCuenta: state.laCuenta + 1 }
      }
      return { laCuenta: 1 }
    }
    return state
  }
  const secondReducer = createReducer({
    otherCounter: counterReducer,
  })
  const reducer = combineReducers(secondReducer, firstReducer)

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  let currState
  currState = reducer(currState, { type: 'increment' })
  currState = reducer(currState, { type: 'increment' })
  currState = reducer(currState, { type: 'otherCounter.decrement' })

  expect(currState).toEqual({
    laCuenta: 2,
    otherCounter: {
      count: 0,
    },
  })
})
