import immerProduce from 'immer'

const produce = (reducerName = 'root', ...args) => {
  try {
    return immerProduce(...args)
  } catch (error) {
    if (error.message.includes('Either return a new value *or* modify the draft.')) {
      throw new Error(`Reducer "${reducerName}" returned a new value *and* modified its state. Either return a new value *or* modify the state.`)
    } else {
      throw error
    }
  }
}
export default produce
