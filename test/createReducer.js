import test from 'ava'
import { Map, List } from 'immutable'

import createReducer from '../src/lib/createReducer'

test('should combine a single reducer', t => {
  const reducer = createReducer({
    initialState: Map({ count: 1 }),
    increment: (v) => v.update('count', v => ++v),
    decrement: (v) => v.update('count', v => --v)
  })
  const initialState = undefined

  t.truthy(reducer)
  t.is(typeof reducer, 'function')
  t.is(reducer(initialState, { type: 'increment' }).get('count'), 2)
  t.is(reducer(initialState, { type: 'decrement' }).get('count'), 0)
})

test('should combine a nested reducer', t => {
  const reducer = createReducer({
    counter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v)
    }
  })
  const initialState = undefined

  t.truthy(reducer)
  t.is(typeof reducer, 'function')
  t.is(reducer(initialState, { type: 'counter.increment' }).getIn(['counter', 'count']), 2)
  t.is(reducer(initialState, { type: 'counter.decrement' }).getIn(['counter', 'count']), 0)
})

test('should combine a really nested reducer', t => {
  const reducer = createReducer({
    another: {
      counter: {
        initialState: Map({ count: 1 }),
        increment: (v) => v.update('count', v => ++v),
        decrement: (v) => v.update('count', v => --v)
      }
    }
  })
  const initialState = undefined

  t.truthy(reducer)
  t.is(typeof reducer, 'function')
  t.is(reducer(initialState, { type: 'another.counter.increment' }).getIn(['another', 'counter', 'count']), 2)
  t.is(reducer(initialState, { type: 'another.counter.decrement' }).getIn(['another', 'counter', 'count']), 0)
})

test('should combine a really really nested reducer', t => {
  const reducer = createReducer({
    another: {
      another: {
        another: {
          counter: {
            initialState: Map({ count: 1 }),
            increment: (v) => v.update('count', v => ++v),
            decrement: (v) => v.update('count', v => --v)
          }
        }
      }
    }
  })
  const initialState = undefined

  t.truthy(reducer)
  t.is(typeof reducer, 'function')
  t.is(
    reducer(initialState, { type: 'another.another.another.counter.increment' })
      .getIn(['another', 'another', 'another', 'counter', 'count']),
    2
  )
  t.is(
    reducer(initialState, { type: 'another.another.another.counter.decrement' })
      .getIn(['another', 'another', 'another', 'counter', 'count']),
    0
  )
})

test('should init with root state', t => {
  const reducer = createReducer({
    counter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v)
    }
  })
  const initialState = Map({
    test: 123
  })

  t.truthy(reducer)
  t.is(typeof reducer, 'function')
  t.deepEqual(reducer(initialState, { type: 'INIT' }).toJS(),
    {
      counter: {
        count: 1
      },
      test: 123
    }
  )
})

test('should work with empty root state', t => {
  const reducer = createReducer({
    counter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v)
    }
  })
  const initialState = Map()
  t.truthy(reducer)
  t.is(typeof reducer, 'function')
  t.is(reducer(initialState, { type: 'counter.increment' }).getIn(['counter', 'count']), 2)
  t.is(reducer(initialState, { type: 'counter.decrement' }).getIn(['counter', 'count']), 0)
})

test('shouldnt default node state', t => {
  const reducer = createReducer({
    counter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v)
    }
  })
  const currState = Map({
    test: 123
  })

  t.truthy(reducer)
  t.is(typeof reducer, 'function')
  t.deepEqual(reducer(currState, { type: 'counter.increment' }).toJS(),
    {
      test: 123,
      counter: {
        count: 2
      }
    }
  )
})

test('should maintain state changes', t => {
  const reducer = createReducer({
    counter: {
      initialState: Map({ count: 0 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v)
    }
  })
  const initialState = Map({
    test: 123
  })
  let currState = initialState

  t.truthy(reducer)
  t.is(typeof reducer, 'function')

  currState = reducer(currState, { type: 'counter.increment' })
  currState = reducer(currState, { type: 'dont.respond.hehe' })
  currState = reducer(currState, { type: 'counter.increment' })
  currState = reducer(currState, { type: 'counter.increment' })

  t.deepEqual(currState.toJS(), {
    counter: {
      count: 3
    },
    test: 123
  })
})

test('should error on non-container initialState', t => {
  t.throws(() => {
    createReducer({
      initialState: Map({
        counter: {
          count: 2
        }
      }),
      counter: {}
    })
  })
})

test('should error on nested non-container initialState', t => {
  t.throws(() => {
    createReducer({
      counter: {
        initialState: Map({
          count: 2
        })
      }
    })
  })
})

test('should error on conflicting parent initialState', t => {
  t.throws(() => {
    createReducer({
      initialState: Map({
        ay: 0,
        counter: {
          count: 2
        }
      }),
      doSomething: (v) => v.update('ay', v => ++v),
      counter: {
        initialState: Map({ count: 1 }),
        increment: (v) => v.update('count', v => ++v),
        decrement: (v) => v.update('count', v => --v)
      }
    })
  })
})

test('should error on non-map parent initialState', t => {
  t.throws(() => {
    createReducer({
      initialState: List([1, 2, 3]),
      doSomething: (v) => v.update('ay', v => ++v),
      counter: {
        initialState: Map({ count: 1 }),
        increment: (v) => v.update('count', v => ++v),
        decrement: (v) => v.update('count', v => --v)
      }
    })
  })
})

test('should error with nested non-immutable state', t => {
  const reducer = createReducer({
    initialState: Map({
      ay: 0
    }),
    doSomething: (v) => v.update('ay', v => ++v),
    counter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v)
    }
  })
  let currState = Map({
    ay: 0,
    counter: {
      count: 0
    }
  })

  t.truthy(reducer)
  t.is(typeof reducer, 'function')

  t.throws(() => {
    currState = reducer(currState, { type: 'counter.increment' }) // count: 1
  })
})

test('should error with root non-immutable state', t => {
  const reducer = createReducer({
    initialState: Map({
      ay: 0
    }),
    doSomething: (v) => v.update('ay', v => ++v),
    counter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v)
    }
  })
  let currState = {
    ay: 0,
    counter: Map({
      count: 0
    })
  }

  t.truthy(reducer)
  t.is(typeof reducer, 'function')

  t.throws(() => {
    currState = reducer(currState, { type: 'counter.increment' }) // count: 1
  })
})

test('should work with nested state', t => {
  const reducer = createReducer({
    initialState: Map({
      ay: 0
    }),
    doSomething: (v) => v.update('ay', v => ++v),
    counter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v)
    }
  })
  let currState = Map({
    ay: 0,
    counter: Map({
      count: 0
    })
  })

  t.truthy(reducer)
  t.is(typeof reducer, 'function')

  currState = reducer(currState, { type: 'counter.increment' }) // count: 1
  currState = reducer(currState, { type: 'counter.increment' }) // count: 2
  currState = reducer(currState, { type: 'doSomething' }) // ay: 1
  currState = reducer(currState, { type: 'counter.increment' }) // count: 3
  currState = reducer(currState, { type: 'counter.decrement' }) // count: 2
  currState = reducer(currState, { type: 'doSomething' }) // ay: 2

  t.deepEqual(currState.toJS(), {
    counter: {
      count: 2
    },
    ay: 2
  })
})

test('should work with nested initialState', t => {
  const reducer = createReducer({
    initialState: Map({
      ay: 0
    }),
    doSomething: (v) => v.update('ay', v => ++v),
    counter: {
      initialState: Map({ count: 1 }),
      increment: (v) => v.update('count', v => ++v),
      decrement: (v) => v.update('count', v => --v)
    }
  })
  let currState = undefined

  t.truthy(reducer)
  t.is(typeof reducer, 'function')

  currState = reducer(currState, { type: 'counter.increment' }) // count: 2
  currState = reducer(currState, { type: 'counter.increment' }) // count: 3
  currState = reducer(currState, { type: 'doSomething' }) // ay: 1
  currState = reducer(currState, { type: 'counter.increment' }) // count: 4
  currState = reducer(currState, { type: 'counter.decrement' }) // count: 3
  currState = reducer(currState, { type: 'doSomething' }) // ay: 2

  t.deepEqual(currState.toJS(), {
    counter: {
      count: 3
    },
    ay: 2
  })
})
