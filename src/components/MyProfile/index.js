import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Cookies from 'js-cookie'

import './index.css'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {profileData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getMyProfileDetails()
  }

  getMyProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const {profile} = data
      console.log(profile, 'my profile details')
      const updatedData = {
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        id: profile.id,
        posts: profile.posts,
        postsCount: profile.posts_count,
        profilePic: profile.profile_pic,
        stories: profile.stories,
        userBio: profile.user_bio,
        userId: profile.user_id,
        userName: profile.user_name,
      }
      console.log(updatedData)
      this.setState({
        profileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {profileData} = this.state
    const postsCount = profileData.posts.length

    return (
      <div className="my-profile-content-container">
        <div className="my-profile-top-section">
          <div className="my-profile-details-section-sm-lg">
            <img
              src={profileData.profilePic}
              alt="my profile"
              className="my-profile-pic-lg"
            />
            <div>
              <h1 className="my-profile-username">{profileData.userName}</h1>

              <ul className="my-profile-details-container">
                <li>
                  <img
                    src={profileData.profilePic}
                    alt="my profile"
                    className="my-profile-pic-sm"
                  />
                </li>
                <li className="my-profile-posts-count-container">
                  <h1 className="my-profile-posts-count">
                    {profileData.postsCount}
                  </h1>
                  <p className="my-profile-details-title">posts</p>
                </li>
                <li className="my-profile-posts-count-container">
                  <h1 className="my-profile-posts-count">
                    {profileData.followersCount}
                  </h1>
                  <p className="my-profile-details-title">followers</p>
                </li>
                <li className="my-profile-posts-count-container">
                  <h1 className="my-profile-posts-count">
                    {profileData.followingCount}
                  </h1>
                  <p className="my-profile-details-title">following</p>
                </li>
              </ul>

              <p className="my-profile-sub-username">{profileData.userId}</p>
              <p className="my-profile-user-bio">{profileData.userBio}</p>
            </div>
          </div>
          <ul className="my-profile-stories-container">
            {profileData.stories.map(eachStory => (
              <li className="my-profile-story-item" key={eachStory.id}>
                <img
                  src={eachStory.image}
                  alt="my story"
                  className="my-profile-story"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="my-profile-bottom-section">
          <div className="my-profile-posts-sub-heading-container">
            <BsGrid3X3 className="grid-icon" />
            <h1 className="my-profile-posts-sub-heading">Posts</h1>
          </div>

          {postsCount > 0 ? (
            <ul className="my-profile-posts-list-container">
              {profileData.posts.map(eachPost => (
                <li className="my-profile-post-list-item" key={eachPost.id}>
                  <img
                    src={eachPost.image}
                    alt="my post"
                    className="my-profile-post-image"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-posts-container">
              <div className="no-posts-camera-container">
                <BiCamera className="camera-icon" />
              </div>
              <h1 className="no-posts-heading">No Posts</h1>
            </div>
          )}
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="my-profile-loader-container" testid="loader">
      <Loader type="TailSpin" height="30" width="30" color="#4094EF" />
    </div>
  )

  onTryAgainGetMyProfile = () => this.getMyProfileDetails()

  renderFailureView = () => (
    <div className="my-profile-failure-container">
      <img
        src="https://res.cloudinary.com/saiuttej/image/upload/v1656409806/Insta%20Share%20Project%20Assets/Group_7737something-went-wrong_rmtore.png"
        alt="failure view"
        className="my-profile-failure-image"
      />
      <p className="my-profile-failure-desc">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="my-profile-failure-retry-button"
        onClick={this.onTryAgainGetMyProfile}
      >
        Try again
      </button>
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="my-profile-page-bg-container">
          {this.renderSwitch()}
        </div>
      </>
    )
  }
}

export default MyProfile
