import { handleActions } from 'redux-actions'
import { Map, Set, fromJS } from 'immutable'
import compose from 'reduce-reducers'

const initialState = Map({
  subsets: Map(),
  entities: Map(),
})

const ensureArray = data => (Array.isArray(data) ? data : [data])

// possible solutions:
// - subsets become maps that are basically pointers to existing nodes in the entities store
// - subsets become lists of IDs and entity types

// shallow entity state
const addEntities = (state, { meta: { forceUpdate }, payload: { normalized } }) => {
  if (!normalized) return state
  // TODO entity not work
  // return fromJS({ entities: normalized.entities }).mergeDeep(state)
  // return state.mergeDeep(fromJS({ entities: normalized.entities }))
  if ( !forceUpdate ) return state.mergeDeep(fromJS({ entities: normalized.entities }))

  const entities = fromJS(normalized.entities)

  return state.withMutations((temporaryState) => {
    entities.map( (entity, key) => {
      temporaryState.setIn(['entities', key], entity)
    })
  })
}

const deleteEntities = (state, { payload: { params, model }  }) => {
  if (!model) return state

  return state.deleteIn(['entities', model.key, params.get('id').toString()])
}

const reset = () => initialState

// subset state
const createSubset = (state, { payload: { subset, fresh } }) => {
  if (!subset) return state
  const path = ['subsets', subset]
  if (!fresh && state.hasIn(path)) return state
  const record = Map({
    id: subset,
    pending: true,
  })
  return state.setIn(path, record)
}

const setSubsetData = (state, { meta: { subset }, payload: { raw, normalized } }) => {
  if (!subset) return state
  const path = ['subsets', subset]
  if (!state.hasIn(path)) return state // subset doesnt exist
  return state.updateIn(path, subsetState =>
    subsetState
      .set('data', fromJS(raw))
      .set('entities', normalized ? Set(ensureArray(normalized.result)) : Set())
      .set('pending', false)
      .set('error', null),
  )
}

const setSubsetError = (state, { meta: { subset }, payload }) => {
  if (!subset) return state
  const path = ['subsets', subset]
  if (!state.hasIn(path)) return state // subset doesnt exist
  return state.updateIn(path, subsetState => subsetState.delete('data').delete('entities').set('error', payload).set('pending', false))
}

// exported actions
export const api = handleActions(
  {
    // eslint-disable-line import/prefer-default-export
    'erebus.request': createSubset,
    'erebus.failure': setSubsetError,
    'erebus.success': compose(setSubsetData, addEntities),
    'erebus.delete': deleteEntities,
    'erebus.reset': reset,
  },
  initialState,
)
