import { Map, List } from 'immutable'

import createReducer from '../createReducer'

it('should combine a single reducer', () => {
  const reducer = createReducer({
    initialState: Map({ count: 1 }),
    increment: state => state.update('count', v => v + 1),
    decrement: state => state.update('count', v => v - 1),
  })
  const initialState = undefined

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')
  expect(reducer(initialState, { type: 'increment' }).get('count')).toBe(2)
  expect(reducer(initialState, { type: 'decrement' }).get('count')).toBe(0)
})

it('should combine a nested reducer', () => {
  const reducer = createReducer({
    counter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  const initialState = undefined

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')
  expect(
    reducer(initialState, { type: 'counter.increment' }).getIn(['counter', 'count']),
  ).toBe(2)
  expect(
    reducer(initialState, { type: 'counter.decrement' }).getIn(['counter', 'count']),
  ).toBe(0)
})

it('should combine a really nested reducer', () => {
  const reducer = createReducer({
    another: {
      counter: {
        initialState: Map({ count: 1 }),
        increment: state => state.update('count', v => v + 1),
        decrement: state => state.update('count', v => v - 1),
      },
    },
  })
  const initialState = undefined

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')
  expect(
    reducer(initialState, { type: 'another.counter.increment' }).getIn(['another', 'counter', 'count']),
  ).toBe(2)
  expect(
    reducer(initialState, { type: 'another.counter.decrement' }).getIn(['another', 'counter', 'count']),
  ).toBe(0)
})

it('should combine a really really nested reducer', () => {
  const reducer = createReducer({
    another: {
      another: {
        another: {
          counter: {
            initialState: Map({ count: 1 }),
            increment: state => state.update('count', v => v + 1),
            decrement: state => state.update('count', v => v - 1),
          },
        },
      },
    },
  })
  const initialState = undefined

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')
  expect(
    reducer(initialState, { type: 'another.another.another.counter.increment' })
      .getIn(['another', 'another', 'another', 'counter', 'count']),
  ).toBe(2)
  expect(
    reducer(initialState, { type: 'another.another.another.counter.decrement' })
      .getIn(['another', 'another', 'another', 'counter', 'count']),
  ).toBe(0)
})

it('should init with root state', () => {
  const reducer = createReducer({
    counter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  const initialState = Map({
    test: 123,
  })

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')
  expect(reducer(initialState, { type: 'INIT' }).toJS()).toEqual({
    counter: {
      count: 1,
    },
    test: 123,
  })
})

it('should work with empty root state', () => {
  const reducer = createReducer({
    counter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  const initialState = Map()
  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')
  expect(
    reducer(initialState, { type: 'counter.increment' }).getIn(['counter', 'count']),
  ).toBe(2)
  expect(
    reducer(initialState, { type: 'counter.decrement' }).getIn(['counter', 'count']),
  ).toBe(0)
})

it('shouldnt default node state', () => {
  const reducer = createReducer({
    counter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  const currState = Map({
    test: 123,
  })

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')
  expect(reducer(currState, { type: 'counter.increment' }).toJS()).toEqual({
    test: 123,
    counter: {
      count: 2,
    },
  })
})

it('should maintain state changes', () => {
  const reducer = createReducer({
    counter: {
      initialState: Map({ count: 0 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  const initialState = Map({
    test: 123,
  })
  let currState = initialState

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  currState = reducer(currState, { type: 'counter.increment' })
  currState = reducer(currState, { type: 'dont.respond.hehe' })
  currState = reducer(currState, { type: 'counter.increment' })
  currState = reducer(currState, { type: 'counter.increment' })

  expect(currState.toJS()).toEqual({
    counter: {
      count: 3,
    },
    test: 123,
  })
})

it('should error on non-container initialState', () => {
  expect(() => {
    createReducer({
      initialState: Map({
        counter: {
          count: 2,
        },
      }),
      counter: {},
    })
  }).toThrow()
})

it('should error on nested non-container initialState', () => {
  expect(() => {
    createReducer({
      counter: {
        initialState: Map({
          count: 2,
        }),
      },
    })
  }).toThrow()
})

it('should error on conflicting parent initialState', () => {
  expect(() => {
    createReducer({
      initialState: Map({
        ay: 0,
        counter: {
          count: 2,
        },
      }),
      doSomething: state => state.update('ay', v => v + 1),
      counter: {
        initialState: Map({ count: 1 }),
        increment: state => state.update('count', v => v + 1),
        decrement: state => state.update('count', v => v - 1),
      },
    })
  }).toThrow()
})

it('should error on non-map parent initialState', () => {
  expect(() => {
    createReducer({
      initialState: List([1, 2, 3]),
      doSomething: state => state.update('ay', v => v + 1),
      counter: {
        initialState: Map({ count: 1 }),
        increment: state => state.update('count', v => v + 1),
        decrement: state => state.update('count', v => v - 1),
      },
    })
  }).toThrow()
})

it('should error with nested non-immutable state', () => {
  const reducer = createReducer({
    initialState: Map({
      ay: 0,
    }),
    doSomething: state => state.update('ay', v => v + 1),
    counter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  let currState = Map({
    ay: 0,
    counter: {
      count: 0,
    },
  })

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  expect(() => {
    currState = reducer(currState, { type: 'counter.increment' }) // count: 1
  }).toThrow()
})

it('should error with root non-immutable state', () => {
  const reducer = createReducer({
    initialState: Map({
      ay: 0,
    }),
    doSomething: state => state.update('ay', v => v + 1),
    counter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  let currState = {
    ay: 0,
    counter: Map({
      count: 0,
    }),
  }

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  expect(() => {
    currState = reducer(currState, { type: 'counter.increment' }) // count: 1
  }).toThrow()
})

it('should work with nested state', () => {
  const reducer = createReducer({
    initialState: Map({
      ay: 0,
    }),
    doSomething: state => state.update('ay', v => v + 1),
    counter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  let currState = Map({
    ay: 0,
    counter: Map({
      count: 0,
    }),
  })

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  currState = reducer(currState, { type: 'counter.increment' }) // count: 1
  currState = reducer(currState, { type: 'counter.increment' }) // count: 2
  currState = reducer(currState, { type: 'doSomething' }) // ay: 1
  currState = reducer(currState, { type: 'counter.increment' }) // count: 3
  currState = reducer(currState, { type: 'counter.decrement' }) // count: 2
  currState = reducer(currState, { type: 'doSomething' }) // ay: 2

  expect(currState.toJS()).toEqual({
    counter: {
      count: 2,
    },
    ay: 2,
  })
})

it('should work with nested initialState', () => {
  const reducer = createReducer({
    initialState: Map({
      ay: 0,
    }),
    doSomething: state => state.update('ay', v => v + 1),
    counter: {
      initialState: Map({ count: 1 }),
      increment: state => state.update('count', v => v + 1),
      decrement: state => state.update('count', v => v - 1),
    },
  })
  let currState

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  currState = reducer(currState, { type: 'counter.increment' }) // count: 2
  currState = reducer(currState, { type: 'counter.increment' }) // count: 3
  currState = reducer(currState, { type: 'doSomething' }) // ay: 1
  currState = reducer(currState, { type: 'counter.increment' }) // count: 4
  currState = reducer(currState, { type: 'counter.decrement' }) // count: 3
  currState = reducer(currState, { type: 'doSomething' }) // ay: 2

  expect(currState.toJS()).toEqual({
    counter: {
      count: 3,
    },
    ay: 2,
  })
})
