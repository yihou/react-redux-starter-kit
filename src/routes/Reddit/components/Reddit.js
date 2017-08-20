import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Reddit.scss'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class Reddit extends Component {
  componentDidMount () {
    const { selectedSubreddit, fetchPostsIfNeeded } = this.props
    fetchPostsIfNeeded(selectedSubreddit)
  }

  componentDidUpdate (prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { selectedSubreddit, fetchPostsIfNeeded } = this.props
      fetchPostsIfNeeded(selectedSubreddit)
    }
  }

  handleChange = (nextSubreddit) => {
    const { selectSubreddit, fetchPostsIfNeeded } = this.props
    selectSubreddit(nextSubreddit)
    fetchPostsIfNeeded(nextSubreddit)
  }

  handleRefreshClick = (e) => {
    e.preventDefault()

    const { selectedSubreddit, invalidateSubreddit, fetchPostsIfNeeded } = this.props
    invalidateSubreddit(selectedSubreddit)
    fetchPostsIfNeeded(selectedSubreddit)
  }

  render () {
    const { selectedSubreddit, postsBySubreddit } = this.props
    const posts = postsBySubreddit[selectedSubreddit]
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']}
        />
        <p>
          {posts.lastUpdated &&
          <span>
              Last updated at {new Date(posts.lastUpdated).toLocaleTimeString()}.
            {' '}
            </span>}
          {
            !posts.isFetching &&
            <a href="#" onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {
          (posts.isFetching && posts.items.length === 0) &&
          <h2>Loading...</h2>
        }
        {
          (!posts.isFetching && posts.items.length === 0) &&
          <h2>Empty.</h2>
        }
        {
          posts.items.length > 0 &&
          <div style={{ opacity: posts.isFetching ? 0.5 : 1 }}>
            <Posts posts={posts.items} />
          </div>
        }
      </div>
    )
  }
}

Reddit.propTypes = {
  selectedSubreddit: PropTypes.string,
  postsBySubreddit: PropTypes.object,
  selectSubreddit: PropTypes.func,
  invalidateSubreddit: PropTypes.func,
  fetchPostsIfNeeded: PropTypes.func
}

export default Reddit
