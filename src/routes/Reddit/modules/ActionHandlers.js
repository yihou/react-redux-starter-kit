import update from 'immutability-helper'

function selectedSubreddit (state, action) {
  return update(state, {
    selectedSubreddit: {
      $set: action.subreddit
    }
  })
}

function requestPosts (state, action) {
  return update(state, {
    postsBySubreddit: {
      [action.subreddit]: {
        isFetching: {
          $set: true
        },
        didInvalidate: {
          $set: false
        }
      }
    }
  })
}

function receivePosts (state, action) {
  return update(state, {
    postsBySubreddit: {
      [action.subreddit]: {
        isFetching: {
          $set: false
        },
        items: {
          $set: action.posts
        },
        lastUpdated: {
          $set: action.receivedAt
        }
      }
    }
  })
}

function invalidateSubreddit (state, action) {
  return update(state, {
    postsBySubreddit: {
      [action.subreddit]: {
        didInvalidate: {
          $set: true
        }
      }
    }
  })
}

export default {
  SELECT_SUBREDDIT     : selectedSubreddit,
  INVALIDATE_SUBREDDIT : invalidateSubreddit,
  REQUEST_POSTS        : requestPosts,
  RECEIVE_POSTS        : receivePosts
}
