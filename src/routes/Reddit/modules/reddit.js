import update from 'immutability-helper'

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

// ------------------------------------
// Actions
// ------------------------------------
export function selectSubreddit (subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit (subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts (subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receivePosts (subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts (subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchPosts (state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded (subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}

export const actions = {
  selectSubreddit,
  invalidateSubreddit,
  fetchPostsIfNeeded
}

// ------------------------------------
// Action Handlers
// ------------------------------------
function handleSelectSubreddit (state, action) {
  return update(state, {
    subreddit: {
      $set: action.payload
    }
  })
}

function handleInvalidateSubreddit (state, action) {
  return update(state, {
    subreddit: {
      $set: action.payload
    }
  })
}

function handleRequestPosts (state, action) {
  return update(state, {
    subreddit: {
      $set: action.payload
    }
  })
}

function handleReceivePosts (state, action) {
  return update(state, {
    subreddit: {
      $set: action.payload
    }
  })
}

const ACTION_HANDLERS = {
  [REQUEST_POSTS]        : handleSelectSubreddit,
  [RECEIVE_POSTS]        : handleInvalidateSubreddit,
  [SELECT_SUBREDDIT]     : handleRequestPosts,
  [INVALIDATE_SUBREDDIT] : handleReceivePosts
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  selectedSubreddit: '',
  posts: [],
  isFetching: false,
  lastUpdated: 0
}

export default function redditReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
