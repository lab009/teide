import createActions from '../createActions'

describe('createActions', () => {
  it('should create from a flat string object', () => {
    const actions = createActions(
      {
        one: 'one',
        two: 'two',
      },
      action => expect(action).toBeTruthy(),
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
      action => expect(action).toBeTruthy(),
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
      action => expect(action).toBeTruthy(),
    )
    expect(actions.one).toBeTruthy()
    expect(actions.two).toBeTruthy()

    expect(actions.one(1)).toEqual({})
    expect(actions.two(2)).toEqual({})
  })

  it('should create from a flat function object with attrs', () => {
    const fn = () => ({})
    fn.attr = true
    fn.ya = false
    fn.toString = () => 'foo'
    const actions = createActions(
      {
        one: fn,
      },
      action => expect(action).toBeTruthy(),
    )

    expect(actions.one).toBeTruthy()

    expect(actions.one(1)).toEqual({})
    expect(actions.one.attr).toEqual(true)
    expect(actions.one.ya).toEqual(false)
    expect(actions.one.toString()).toEqual('foo')
  })
})
