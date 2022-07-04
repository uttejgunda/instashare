import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import './index.css'

class InstaPostItem extends Component {
  state = {isLiked: false}

  updateLikes = async () => {
    const {isLiked} = this.state
    const {postDetails} = this.props
    const {postId} = postDetails
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const likeDetails = {
      like_status: isLiked,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(likeDetails),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  }

  onToggleLikes = () => {
    this.setState(
      prevState => ({isLiked: !prevState.isLiked}),
      this.updateLikes,
    )
  }

  render() {
    const {postDetails} = this.props
    const {isLiked} = this.state

    return (
      <li className="post-list-item">
        <Link
          to={`/users/${postDetails.userId}`}
          className="post-item-link-tag"
        >
          <div className="post-profile-container">
            <img
              src={postDetails.profilePic}
              alt="post author profile"
              className="post-profile-image"
            />
            <p className="post-profile-username">{postDetails.userName}</p>
          </div>
        </Link>
        <img
          src={postDetails.postDetails.imageUrl}
          alt="post"
          className="post-image"
        />

        <div className="post-details-container">
          <div className="actions-container">
            <button
              type="button"
              className="action-button"
              onClick={this.onToggleLikes}
            >
              {isLiked ? (
                <FcLike className="liked-icon" testid="unLikeIcon" />
              ) : (
                <BsHeart className="action-icon like-icon" testid="likeIcon" />
              )}
            </button>
            <button
              type="button"
              className="action-button"
              onClick={this.onToggleLikes}
            >
              <FaRegComment className="action-icon" />
            </button>
            <button
              type="button"
              className="action-button"
              onClick={this.onToggleLikes}
            >
              <BiShareAlt className="action-icon" />
            </button>
          </div>
          <p className="post-likes-count">
            {isLiked
              ? `${postDetails.likesCount + 1} likes`
              : `${postDetails.likesCount} likes`}
          </p>
          <p className="post-caption-text">{postDetails.postDetails.caption}</p>
          <ul className="comments-list-container">
            {postDetails.comments.map(eachComment => (
              <li className="comment-list-item" key={eachComment.userId}>
                <p className="comment-desc">
                  <span className="comment-username">
                    {eachComment.userName}
                  </span>
                  {eachComment.comment}
                </p>
              </li>
            ))}
          </ul>
          <p className="post-created-at">{postDetails.createdAt}</p>
        </div>
      </li>
    )
  }
}
export default InstaPostItem
