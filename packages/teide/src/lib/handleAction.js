import { handleAction as _handleAction } from 'redux-actions'

import produce from './produce'

const handleAction = (name, fn) => _handleAction(name, produce(name, fn), null)

export default handleAction
