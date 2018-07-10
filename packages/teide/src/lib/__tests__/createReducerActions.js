import createReducerActions from '../createReducerActions'

const counterReducer = {
  initialState: { count: 1 },
  increment: (state) => { state.count += 1 },
  decrement: (state) => { state.count -= 1 },
}

it('should create actions for a flat reducer', () => {
  const actions = createReducerActions(counterReducer)

  expect(actions.increment).toBeTruthy()
  expect(actions.decrement).toBeTruthy()

  expect(actions.increment()).toEqual({ type: 'increment' })
  expect(actions.decrement()).toEqual({ type: 'decrement' })
  expect(actions.increment(1)).toEqual({ type: 'increment', payload: 1 })
  expect(actions.decrement(1)).toEqual({ type: 'decrement', payload: 1 })
})

it('should create actions for a nested reducer', () => {
  const reducer = {
    counter: counterReducer,
  }
  const actions = createReducerActions(reducer)

  expect(actions.counter.increment).toBeTruthy()
  expect(actions.counter.decrement).toBeTruthy()

  expect(actions.counter.increment()).toEqual({ type: 'counter.increment' })
  expect(actions.counter.decrement()).toEqual({ type: 'counter.decrement' })
  expect(actions.counter.increment(1)).toEqual({ type: 'counter.increment', payload: 1 })
  expect(actions.counter.decrement(1)).toEqual({ type: 'counter.decrement', payload: 1 })
})

it('should create actions for a really nested reducer', () => {
  const reducer = {
    yo: {
      counter: counterReducer,
    },
  }
  const actions = createReducerActions(reducer)

  expect(actions.yo.counter.increment).toBeTruthy()
  expect(actions.yo.counter.decrement).toBeTruthy()

  expect(actions.yo.counter.increment()).toEqual({ type: 'yo.counter.increment' })
  expect(actions.yo.counter.decrement()).toEqual({ type: 'yo.counter.decrement' })
  expect(actions.yo.counter.increment(1)).toEqual({ type: 'yo.counter.increment', payload: 1 })
  expect(actions.yo.counter.decrement(1)).toEqual({ type: 'yo.counter.decrement', payload: 1 })
})
