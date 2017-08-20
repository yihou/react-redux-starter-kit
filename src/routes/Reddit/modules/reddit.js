import initialState from './InitialState'
import ACTION_HANDLERS from './ActionHandlers'

export default function redditReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
