# @eagle/tango

> Toolkit for building redux/react applications

## Install

```js
npm install --save @eagle/tango react
```

## Repository

https://github.com/Graf009/tango.git

## Core Ideals

- Everything should be immutable
- Everything should work easily and be simple to understand
- Spend time building applications rather than wiring modules together

## Implementation

- Use ES6
- Central store is completely immutable via Immutable.js
  - PropTypes include Immutable.js types by default
  - Tango plugins and components rely on this immutability
- Easy to understand objects instead of crazy functional composition
  - Before: `createStore(combineReducers(reducers), {}, compose(applyMiddleware(middleware), devtools))`
  - After: `createStore({middleware: middleware, reducers: reducers, initialState: {}})`
- Bundle middleware, enhancers, and reducers together as drop in "plugins"
  - One line of code to add a router and etc. to your project
  - High quality ecosystem of modules guaranteed to work well with eachother
- Namespaced/nested actions and reducers
  - `todos.create` as an action corresponds to a `todos.create` reducer and `todos` in the store
- Default middleware
  - thunk
  - devtools
- Dead simple Component API
  - Use ES6 classes
  - Bring back sane behavior
    - Bind component functions scope to class (like old react)
  - Never write mapDispatchToProps or mapStateToProps
