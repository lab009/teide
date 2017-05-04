# @lab009/teide-data-view

Simple component for managing asynchronous data dependency states. If you have a view with 3 base states: fetching, loaded, and errored - this will help you clean up a lot of boilerplate.
Works out of the box with `@lab009/erebus` for doing API stuff.

## Install

```js
npm install --save @lab009/teide-data-view
```

## API

You can define three functions:

- `resolveData`
  - Defaults to doing nothing
  - Triggered on mount/update when any `storeProps` (what you give to teide's connect function) are not fulfilled
  - Responsible for dispatching any actions to fetch data
- `renderData`
  - Defaults to displaying nothing
  - Triggered when all storeProps are resolved
  - Receives a data object as an argument
  - Responsible for rendering the data
- `renderLoader`
  - Defaults to displaying nothing
  - Triggered when all storeProps are not resolved
  - Responsible for rendering a loader
- `renderErrors`
  - Defaults to displaying nothing
  - Triggered when any storeProp value has an `error` attribute
  - Receives an errors Map as an argument
    - Key is the storeProp
    - Value is the error object
  - Responsible for rendering any errors that happened while fetching data

## Example

```js
import React from 'react'
import { PropTypes, connect } from '@lab009/teide'
import DataComponent from '@lab009/teide-data-view'
import actions from 'core/actions'

@connect({
  users: 'subsets.users'
})
export default class UserList extends DataComponent {
  static propTypes = {
    users: PropTypes.iterable
  }

  resolveData() {
    actions.api.users.find({ subset: 'users' })
  }

  renderData({ users }) {
    return (
      <div>
        <h1>{users.size} Users</h1>
        <ul>
        {
          users.map(user =>
            <li key={user.get('id')}>{user.get('name')}</li>
          )
        }
        </ul>
      </div>
    )
  }

  renderLoader () {
    return (
      <h1>Loading...</h1>
    )
  }

  renderErrors(errors) {
    return (
      <ul>
        {
          errors.map((err, field) =>
            <li key={field}>{field}: {err.message}</li>
          )
        }
      </ul>
    )
  }
}
```
