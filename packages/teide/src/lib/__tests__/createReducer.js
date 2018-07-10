import createReducer from '../createReducer'

const counterReducer = {
  initialState: { count: 1 },
  increment: (state) => { state.count += 1 },
  decrement: (state) => { state.count -= 1 },
}

it('should combine a single reducer', () => {
  const reducer = createReducer(counterReducer)

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  const initialState = undefined
  expect(reducer(initialState, { type: 'increment' }).count).toBe(2)
  expect(reducer(initialState, { type: 'decrement' }).count).toBe(0)
})

it('should combine a nested reducer', () => {
  const reducer = createReducer({
    counter: counterReducer,
  })

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  const initialState = undefined
  expect(reducer(initialState, { type: 'counter.increment' }).counter.count).toBe(2)
  expect(reducer(initialState, { type: 'counter.decrement' }).counter.count).toBe(0)
})

it('should combine a really nested reducer', () => {
  const reducer = createReducer({
    another: {
      counter: counterReducer,
    },
  })

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  const initialState = undefined
  expect(reducer(initialState, { type: 'another.counter.increment' }).another.counter.count).toBe(2)
  expect(reducer(initialState, { type: 'another.counter.decrement' }).another.counter.count).toBe(0)
})

it('should combine a really really nested reducer', () => {
  const reducer = createReducer({
    another: {
      another: {
        another: {
          counter: counterReducer,
        },
      },
    },
  })

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  const initialState = undefined
  expect(
    reducer(initialState, { type: 'another.another.another.counter.increment' })
      .another
      .another
      .another
      .counter
      .count
  ).toBe(2)
  expect(
    reducer(initialState, { type: 'another.another.another.counter.decrement' })
      .another
      .another
      .another
      .counter
      .count
  ).toBe(0)
})

it('should init with root state', () => {
  const reducer = createReducer({
    counter: counterReducer,
  })
  const initialState = {
    test: 123,
  }

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  expect(reducer(initialState, { type: 'INIT' })).toEqual({
    counter: {
      count: 1,
    },
    test: 123,
  })
})

it('should work with empty root state', () => {
  const reducer = createReducer({
    counter: counterReducer,
  })
  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  const initialState = {}
  expect(reducer(initialState, { type: 'counter.increment' }).counter.count).toBe(2)
  expect(reducer(initialState, { type: 'counter.decrement' }).counter.count).toBe(0)
})

it('shouldnt default node state', () => {
  const reducer = createReducer({
    counter: counterReducer,
  })

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  const currState = {
    test: 123,
  }
  expect(reducer(currState, { type: 'counter.increment' })).toEqual({
    test: 123,
    counter: {
      count: 2,
    },
  })
})

it('should maintain state changes', () => {
  const reducer = createReducer({
    counter: counterReducer,
  })

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  const initialState = {
    test: {
      foo: 123,
    },
  }
  let currState = initialState
  currState = reducer(currState, { type: 'counter.increment' })
  currState = reducer(currState, { type: 'dont.respond.hehe' })
  currState = reducer(currState, { type: 'counter.increment' })
  const finalState = reducer(currState, { type: 'counter.increment' })

  expect(finalState).toEqual({
    counter: {
      count: 4,
    },
    test: {
      foo: 123,
    },
  })
  expect(currState).not.toBe(finalState)
  expect(currState.counter).not.toBe(finalState.count)
  expect(currState.test).toBe(finalState.test)
})

it('should error on non-container initialState', () => {
  expect(() => {
    createReducer({
      initialState: {
        counter: {
          count: 2,
        },
      },
      counter: {},
    })
  }).toThrow()
})

it('should error on nested non-container initialState', () => {
  expect(() => {
    createReducer({
      counter: {
        initialState: {
          count: 2,
        },
      },
    })
  }).toThrow()
})

it('should error on conflicting parent initialState', () => {
  expect(() => {
    createReducer({
      initialState: {
        ay: 0,
        counter: {
          count: 2,
        },
      },
      doSomething: (state) => { state.ay += 1 },
      counter: counterReducer,
    })
  }).toThrow()
})

it('should error on non-object parent initialState', () => {
  expect(() => {
    createReducer({
      initialState: [1, 2, 3],
      doSomething: (state) => { state.ay += 1 },
      counter: counterReducer,
    })
  }).toThrow()
})

it('should work with nested state', () => {
  const reducer = createReducer({
    initialState: {
      ay: 0,
    },
    doSomething: (state) => { state.ay += 1 },
    counter: counterReducer,
  })

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  let currState = {
    ay: 0,
    counter: {
      count: 0,
    },
  }
  currState = reducer(currState, { type: 'counter.increment' }) // count: 1
  currState = reducer(currState, { type: 'counter.increment' }) // count: 2
  currState = reducer(currState, { type: 'doSomething' }) // ay: 1
  currState = reducer(currState, { type: 'counter.increment' }) // count: 3
  currState = reducer(currState, { type: 'counter.decrement' }) // count: 2
  currState = reducer(currState, { type: 'doSomething' }) // ay: 2

  expect(currState).toEqual({
    counter: {
      count: 2,
    },
    ay: 2,
  })
})

it('should work with nested initialState', () => {
  const reducer = createReducer({
    initialState: {
      ay: 0,
    },
    doSomething: (state) => { state.ay += 1 },
    counter: counterReducer,
  })

  expect(reducer).toBeTruthy()
  expect(typeof reducer).toBe('function')

  let currState
  currState = reducer(currState, { type: 'counter.increment' }) // count: 2
  currState = reducer(currState, { type: 'counter.increment' }) // count: 3
  currState = reducer(currState, { type: 'doSomething' }) // ay: 1
  currState = reducer(currState, { type: 'counter.increment' }) // count: 4
  currState = reducer(currState, { type: 'counter.decrement' }) // count: 3
  currState = reducer(currState, { type: 'doSomething' }) // ay: 2

  expect(currState).toEqual({
    counter: {
      count: 3,
    },
    ay: 2,
  })
})
