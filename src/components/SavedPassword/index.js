import './index.css'

const SavedPassword = props => {
  const {logoDetails, deleteSavedPassword} = props

  const {userName, password, websiteUrl, id} = logoDetails

  const onClickDeleteBtn = () => {
    deleteSavedPassword(id)
  }

  const isShowPassword = () => {
    const {showPassword} = props
    if (showPassword) {
      return <p className="website-password">{password}</p>
    }
    return (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        alt="stars"
        className="star-icons"
      />
    )
  }

  return (
    <li className="saved-password-item">
      <div className="password-profile-sec">
        <div className="profile-pic-bg">
          <p className="profile-pic">J</p>
        </div>
        <div className="profile-details">
          <p className="website-name">{websiteUrl}</p>
          <p className="profiler-name">{userName}</p>
          {isShowPassword()}
        </div>
        <button type="button" className="delete-btn" data-testid="delete">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
            onClick={onClickDeleteBtn}
          />
        </button>
      </div>
    </li>
  )
}

export default SavedPassword
