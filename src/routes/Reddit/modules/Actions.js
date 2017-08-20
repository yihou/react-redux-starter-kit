import Types from './Constants'

export function selectSubreddit (subreddit) {
  return {
    type: Types.SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit (subreddit) {
  return {
    type: Types.INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts (subreddit) {
  return {
    type: Types.REQUEST_POSTS,
    subreddit
  }
}

function receivePosts (subreddit, json) {
  return {
    type: Types.RECEIVE_POSTS,
    subreddit,
    posts: json.data.children,
    receivedAt: Date.now()
  }
}

function fetchPosts (subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
      .catch(err => console.log(err))
  }
}

function shouldFetchPosts (state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  console.log(posts)
  if (!posts.items) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded (subreddit) {
  return (dispatch, store) => {
    if (shouldFetchPosts(store().reddit, subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}
