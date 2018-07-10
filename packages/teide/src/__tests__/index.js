import * as teide from '../'

it('should export the right stuff', () => {
  expect(teide.Component).toBeTruthy()
  expect(teide.connect).toBeTruthy()
  expect(teide.Provider).toBeTruthy()
  expect(teide.combineReducers).toBeTruthy()
  expect(teide.createReducer).toBeTruthy()
  expect(teide.createReducerActions).toBeTruthy()
  expect(teide.createActions).toBeTruthy()
  expect(teide.createStore).toBeTruthy()
})
