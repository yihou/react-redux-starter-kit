import { connect } from 'react-redux'

import Reddit from '../components/Reddit'

import {
  selectSubreddit,
  invalidateSubreddit,
  fetchPostsIfNeeded
} from '../modules/Actions'

const mapDispatchToProps = {
  selectSubreddit,
  invalidateSubreddit,
  fetchPostsIfNeeded
}

const mapStateToProps = (state) => ({
  selectedSubreddit: state.reddit.selectedSubreddit,
  postsBySubreddit: state.reddit.postsBySubreddit
})

export default connect(mapStateToProps, mapDispatchToProps)(Reddit)
