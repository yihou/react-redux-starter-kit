import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Picker from '../components/Picker'
import Posts from '../components/Posts'

class Reddit extends Component {
  componentDidMount () {
    const { dispatch, selectedSubreddit, fetchPostsIfNeeded } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  componentDidUpdate (prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit, fetchPostsIfNeeded } = this.props
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange = (nextSubreddit) => {
    const { dispatch, selectSubreddit, fetchPostsIfNeeded } = this.props
    dispatch(selectSubreddit(nextSubreddit))
    dispatch(fetchPostsIfNeeded(nextSubreddit))
  }

  handleRefreshClick = (e) => {
    e.preventDefault()

    const { dispatch, selectedSubreddit, invalidateSubreddit, fetchPostsIfNeeded } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render () {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']}
        />
        <p>
          {lastUpdated &&
          <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
            {' '}
            </span>}
          {!isFetching &&
          <a href="#" onClick={this.handleRefreshClick}>
            Refresh
          </a>}
        </p>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 &&
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <Posts posts={posts} />
        </div>}
      </div>
    )
  }
}

Reddit.propTypes = {
  selectedSubreddit: PropTypes.string,
  posts: PropTypes.array,
  isFetching: PropTypes.bool,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func,
  selectSubreddit: PropTypes.func,
  invalidateSubreddit: PropTypes.func,
  fetchPostsIfNeeded: PropTypes.func
}

export default Reddit
