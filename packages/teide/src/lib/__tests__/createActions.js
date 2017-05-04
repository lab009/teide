import createActions from '../createActions'

it('should create from a flat string object', () => {
  const actions = createActions(
    {
      one: 'one',
      two: 'two',
    },
    (action) => {
      expect(action).toBeTruthy()
      return action
    },
  )
  expect(actions.one).toBeTruthy()
  expect(actions.two).toBeTruthy()

  expect(actions.one(1)).toEqual({ type: 'one', payload: 1 })
  expect(actions.two(2)).toEqual({ type: 'two', payload: 2 })
})

it('should create from a nested string object', () => {
  const actions = createActions(
    {
      one: {
        half: 'one',
      },
      two: {
        half: 'two',
      },
    },
    (action) => {
      expect(action).toBeTruthy()
      return action
    },
  )
  expect(actions.one.half).toBeTruthy()
  expect(actions.two.half).toBeTruthy()

  expect(actions.one.half(1)).toEqual({ type: 'one', payload: 1 })
  expect(actions.two.half(2)).toEqual({ type: 'two', payload: 2 })
})

it('should create from a flat function object', () => {
  const actions = createActions(
    {
      one: () => ({}),
      two: () => ({}),
    },
    (action) => {
      expect(action).toBeTruthy()
      return action
    },
  )
  expect(actions.one).toBeTruthy()
  expect(actions.two).toBeTruthy()

  expect(actions.one(1)).toEqual({})
  expect(actions.two(2)).toEqual({})
})
