import { connect } from 'react-redux'
import Reddit from '../components/Reddit'

import {
  selectSubreddit,
  invalidateSubreddit,
  fetchPostsIfNeeded
} from '../modules/reddit'

const mapDispatchToProps = {
  selectSubreddit,
  invalidateSubreddit,
  fetchPostsIfNeeded
}

const mapStateToProps = (state) => ({
  selectedSubreddit: state.reddit.selectedSubreddit,
  posts: state.reddit.posts,
  isFetching: state.reddit.isFetching,
  lastUpdated: state.reddit.lastUpdated
})

export default connect(mapStateToProps, mapDispatchToProps)(Reddit)
