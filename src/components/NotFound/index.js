import './index.css'

const NotFound = props => {
  const onGoToHomePage = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/saiuttej/image/upload/v1656446566/Insta%20Share%20Project%20Assets/erroring_2not-found-image_trh9zc.png"
        alt="page not found"
        className="not-found-image"
      />
      <h1 className="not-found-title">PAGE NOT FOUND</h1>
      <p className="not-found-desc">
        we are sorry, the page you requested could not be found
      </p>
      <p className="not-found-desc">Please go back to homepage</p>
      <button
        type="button"
        className="not-found-home-button"
        onClick={onGoToHomePage}
      >
        Home Page
      </button>
    </div>
  )
}

export default NotFound
