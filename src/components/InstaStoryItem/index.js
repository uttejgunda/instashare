import './index.css'

const InstaStoryItem = props => {
  const {eachStory} = props
  const {storyUrl, userName} = eachStory
  return (
    <div className="slick-item">
      <img src={storyUrl} alt="user story" className="user-story-image" />
      <p className="story-username">{userName}</p>
    </div>
  )
}

export default InstaStoryItem
