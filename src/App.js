import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './App.css'

const colorHexCodes = ['#0b69ff', '#94a3b8', '#b6c3ca']

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    isChecked: false,
    yourPasswordsList: [],
    searchInput: '',
  }

  deletePassword = id => {
    const {yourPasswordsList} = this.state
    const filteredPasswords = yourPasswordsList.filter(
      eachItem => eachItem.id !== id,
    )

    this.setState({
      yourPasswordsList: filteredPasswords,
    })
  }

  onChecked = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onAddNewPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPasswordDetails = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      initialLetter: websiteInput[0].toUpperCase(),
      color: colorHexCodes[Math.floor(Math.random() * colorHexCodes.length)],
    }
    this.setState(prevState => ({
      yourPasswordsList: [...prevState.yourPasswordsList, newPasswordDetails],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onSearchPassword = event => {
    this.setState({searchInput: event.target.value})
  }

  renderAddNewPassword = () => {
    const {websiteInput, usernameInput, passwordInput} = this.state

    return (
      <form
        className="add-new-password-container"
        onSubmit={this.onAddNewPassword}
      >
        <h1 className="add-new-password-heading">Add New Password</h1>
        <div className="input-item-container">
          <img
            className="input-item-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
            alt="website"
          />
          <input
            className="input-item"
            type="text"
            placeholder="Enter Website"
            value={websiteInput}
            onChange={this.onChangeWebsite}
          />
        </div>
        <div className="input-item-container">
          <img
            className="input-item-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
            alt="username"
          />
          <input
            className="input-item"
            type="text"
            placeholder="Enter Username"
            value={usernameInput}
            onChange={this.onChangeUsername}
          />
        </div>
        <div className="input-item-container">
          <img
            className="input-item-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
            alt="password"
          />
          <input
            className="input-item"
            type="password"
            placeholder="Enter Password"
            value={passwordInput}
            onChange={this.onChangePassword}
          />
        </div>
        <button type="submit" className="add-button">
          Add
        </button>
      </form>
    )
  }

  render() {
    const {yourPasswordsList, isChecked, searchInput} = this.state
    const filteredPasswordsList = yourPasswordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const passwordsLength = filteredPasswordsList.length !== 0

    return (
      <div className="app-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="inputs-container">
          <img
            className="password-manager-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
          {this.renderAddNewPassword()}
        </div>
        <div className="your-password-container">
          <div className="search-and-count-container">
            <div className="your-password-count-container">
              <h1 className="your-password-count-heading">Your Passwords</h1>
              <p className="your-password-count">{yourPasswordsList.length}</p>
            </div>
            <div className="your-password-search-container">
              <img
                className="your-password-search-icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                className="your-password-search-input"
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onSearchPassword}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="check-box-container">
            <input
              className="check-input"
              id="checkbox"
              type="checkbox"
              checked={isChecked}
              onChange={this.onChecked}
            />
            <label className="label-heading" htmlFor="checkbox">
              Show Passwords
            </label>
          </div>
          {!passwordsLength && (
            <div className="no-password-container">
              <img
                className="no-password-image"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="no-password-heading">No Passwords</p>
            </div>
          )}
          {passwordsLength && (
            <ul className="passwords-items-container">
              {filteredPasswordsList.map(passwordItem => (
                <li className="password-item-container" key={passwordItem.id}>
                  <div className="details-container">
                    <p
                      className="initial-text"
                      style={{backgroundColor: `${passwordItem.color}`}}
                    >
                      {passwordItem.initialLetter}
                    </p>
                    <div className="detail-container">
                      <p className="website-name">{passwordItem.website}</p>
                      <p className="username">{passwordItem.username}</p>
                      {!isChecked && (
                        <img
                          className="stars-image"
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                        />
                      )}
                      {isChecked && (
                        <p className="password">{passwordItem.password}</p>
                      )}
                    </div>
                  </div>
                  <button
                    data-testid="delete"
                    type="button"
                    className="delete-button"
                    onClick={this.deletePassword(passwordItem.id)}
                  >
                    <img
                      className="delete-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
