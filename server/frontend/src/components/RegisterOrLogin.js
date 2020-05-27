import React from 'react'
import axios from 'axios'

import { Button } from 'reactstrap'

import { handleChange } from '../utils/inputs'

class RegisterOrLogin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      mode: 'login'
    }

    this.handleChange = handleChange.bind(this)
  }
  

  handleSubmit = async (e) => {
    e.preventDefault()

    // sign the user up with strapi
    const { email, password, mode, username } = this.state

    const data = {
      // identifier: email,
      username,
      email,
      password
    }

    let url = ''
    if (mode === 'login') {
      url = '/api/auth/local'
    }

    if (mode === 'signup') {
      url = '/api/auth/local/register'
    }

    const userCreationRes = await axios({
      method: 'POST',
      url,
      data
    })

    if (this.props.updateUser && typeof this.props.updateUser === 'function') {
      localStorage.setItem('user', JSON.stringify(userCreationRes.data))
      this.props.updateUser(userCreationRes.data)
    }
  }

  render() {
    const { email, password, mode, username } = this.state

    return (
      <div className='landing'>
        
      {/* <h1>{ mode }</h1> */}
      <h1 className='header'>Welcome to QuickRecipes!<br />
        <small>The Recipe Storage App</small>
      </h1>

      <p className='landing body'>
        If you've never been here before, this app was created for my wife and mother to have a place to be able to save, and quickly retrieve, recipes that they found on Facebook!
      </p>
      
      <h2>{ mode.toUpperCase() }</h2>
      <form className='landing-form' onSubmit={ this.handleSubmit }>
        <div className='form-div'>
          {
            mode === 'signup' &&
            <>
              <label htmlFor='username'>Username</label>
              <input name='username' id='username' value={ username } onChange={ this.handleChange } />
            </>
          }
          <label htmlFor='email'>Email</label>
          <input name='email' id='email' value={ email } onChange={ this.handleChange } />
        </div>
        <div className='form-div'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' value={password} onChange={ this.handleChange } />
        </div>
        <Button type='submit' className='form-button' color='primary'>
          { mode.toUpperCase() }
        </Button>
      </form>

      {
        mode === 'login' &&
        <Button
          onClick={() => this.setState({ mode: 'signup' })}
          className='mode-change-button'
          color='warning'
        >
          Want to signup instead?
        </Button>
      }

      {
        mode === 'signup' &&
        <Button
          onClick={() => this.setState({ mode: 'login' })}
          className='mode-change-button'
          color='warning'
        >
          Want to login instead?
        </Button>
      }
      </div>
    )
  }
}

export default RegisterOrLogin