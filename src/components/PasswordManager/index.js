import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'
import SavedPassword from '../SavedPassword'

class PasswordManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginDetails: [],
      websiteUrl: '',
      userName: '',
      password: '',
      showPassword: false,
      searchInput: '',
    }
  }

  onEnterWebsiteDomainName = event => {
    this.setState({websiteUrl: event.target.value})
  }

  onEnterUserName = event => {
    this.setState({userName: event.target.value})
  }

  onEnterUserPassword = event => {
    this.setState({password: event.target.value})
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onClickAddButton = event => {
    event.preventDefault()
    const {websiteUrl, userName, password} = this.state
    const newLoginDetails = {
      id: uuidv4(),
      websiteUrl,
      userName,
      password,
    }

    this.setState(prevState => ({
      loginDetails: [...prevState.loginDetails, newLoginDetails],
      websiteUrl: '',
      userName: '',
      password: '',
    }))
  }

  notFound = () => (
    <div className="notfound-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password-img"
      />
      <p className="no-passwords-title">no passwords</p>
    </div>
  )

  deleteSavedPassword = id => {
    this.setState(prevState => ({
      loginDetails: prevState.loginDetails.filter(
        eachItem => eachItem.id !== id,
      ),
    }))
  }

  onSearchPasswords = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {loginDetails, searchInput, showPassword} = this.state

    const searchResult = loginDetails.filter(eachItem =>
      eachItem.websiteUrl.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const countValue =
      searchResult === '' ? loginDetails.length : searchResult.length
    return (
      <div className="app-container">
        <div className="password-manager-container">
          <div className="app-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              className="app-logo-img"
              alt="app logo"
            />
          </div>
          <div className="password-manager-header-sec">
            <form
              className="adding-password-container"
              onSubmit={this.onClickAddButton}
            >
              <h1 className="add-password-title">Add New Password</h1>
              <div className="user-input-container">
                <div className="logo-bg">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="logo"
                  />
                </div>
                <input
                  type="text"
                  className="user-value"
                  placeholder="Enter Website"
                  onChange={this.onEnterWebsiteDomainName}
                />
              </div>
              <div className="user-input-container">
                <div className="logo-bg">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="logo"
                  />
                </div>
                <input
                  type="text"
                  className="user-value"
                  placeholder="Enter Username"
                  onChange={this.onEnterUserName}
                />
              </div>
              <div className="user-input-container">
                <div className="logo-bg">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                    alt="password"
                    className="logo"
                  />
                </div>
                <input
                  type="password"
                  className="user-value"
                  placeholder="Enter Password"
                  onChange={this.onEnterUserPassword}
                />
              </div>
              <div className="add-btn-container">
                <button className="add-btn" type="submit">
                  Add
                </button>
              </div>
            </form>
            <div className="password-manager-img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-manager-img"
              />
            </div>
          </div>
          <div className="password-manager-footer-sec">
            <div className="your-passwords">
              <div className="your-passwords-sec">
                <h1 className="your-password-title"> Your Passwords</h1>
                <p className="saved-password-count" type="button">
                  {countValue}
                </p>
              </div>
              <div className="search-container">
                <div className="search-icon-bg">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-icon"
                  />
                </div>

                <input
                  type="search"
                  className="search-input"
                  placeholder="search"
                  value={searchInput}
                  onChange={this.onSearchPasswords}
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="show-password-sec">
              <input
                type="checkbox"
                className="show-password-btn"
                id="showPassword"
                onClick={this.onClickShowPassword}
              />
              <label
                className="show-password-label-text"
                htmlFor="showPassword"
              >
                Show passwords
              </label>
            </div>
            <ul className="saved-password-container">
              {countValue === 0
                ? this.notFound()
                : searchResult.map(eachItem => (
                    <SavedPassword
                      key={eachItem.id}
                      logoDetails={eachItem}
                      deleteSavedPassword={this.deleteSavedPassword}
                      showPassword={showPassword}
                    />
                  ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
