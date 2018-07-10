import { handleActions } from 'redux-actions'
import { mergeDeepLeft, set, view, lensPath } from 'ramda'
import compose from 'reduce-reducers'

const initialState = {
  subsets: {},
  entities: {},
}

const ensureArray = data => (Array.isArray(data) ? data : [data])

// possible solutions:
// - subsets become maps that are basically pointers to existing nodes in the entities store
// - subsets become lists of IDs and entity types

// shallow entity state
const addEntities = (state, { meta: { forceUpdate }, payload: { normalized } }) => {
  if (!normalized) return state
  const { entities } = normalized

  if (!forceUpdate) {
    mergeDeepLeft({ entities }, state)
    return
  }

  Object.keys(entities).forEach((key) => {
    state.entities[key] = entities[key]
  })
}

const deleteEntities = (state, { payload: { params, model } }) => {
  if (!model) return

  delete state.entities[model.key][params.id]
}

const reset = () => initialState

// subset state
const createSubset = (state, { payload: { subset, fresh } }) => {
  if (!subset) return state
  const subsetLens = lensPath(['subsets', subset])
  if (!fresh && view(subsetLens, state)) return state
  return set(subsetLens, { id: subset, pending: true }, state)
}

const setSubsetData = (state, { meta: { subset }, payload: { raw, text, normalized } }) => {
  if (!subset) return state
  const subsetLens = lensPath(['subsets', subset])
  if (!view(subsetLens, state)) return state // subset doesnt exist
  return set(subsetLens, {
    ...state.subsets[subset],
    data: raw,
    entities: normalized ? ensureArray(normalized.result) : null,
    text,
    pending: false,
    error: null,
  }, state)
}

const setSubsetError = (state, { meta: { subset }, payload }) => {
  if (!subset) return state
  const subsetLens = lensPath(['subsets', subset])
  if (!view(subsetLens, state)) return state // subset doesnt exist
  return set(subsetLens, {
    data: null,
    entities: null,
    text: null,
    pending: false,
    error: payload,
  }, state)
}

// exported actions
// eslint-disable-next-line import/prefer-default-export
export const api = handleActions(
  {
    'erebus.request': createSubset,
    'erebus.failure': setSubsetError,
    // 'erebus.success': compose(setSubsetData, addEntities),
    'erebus.success': setSubsetData,
    'erebus.delete': deleteEntities,
    'erebus.reset': reset,
  },
  initialState
)
