import { createAction } from 'redux-actions';
import mapValues from 'lodash.mapvalues';

// equiv of redux createAction but recursive

export var createActions = function createActions(actions, dispatch) {
  if (typeof dispatch !== 'function') throw new Error('Missing dispatch argument in createActions');

  // map string to a fn and pass back through
  if (typeof actions === 'string') return createActions(createAction(actions), dispatch);

  // wrap function in a dispatch
  if (typeof actions === 'function') {
    return function () {
      var action = actions.apply(undefined, arguments);
      dispatch(action);
      return action;
    };
  }

  // iterate through objects and do mapping
  return mapValues(actions, function (action) {
    return createActions(action, dispatch);
  });
};

export default createActions;