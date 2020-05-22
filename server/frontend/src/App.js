import React from 'react'
import './App.css'
import axios from 'axios'

import Layout from './components/Layout'
import RegisterOrLogin from './components/RegisterOrLogin'
import RecipePage from './components/RecipePage'

class App extends React.Component {
  state = {
    user: null
  }

  async componentDidMount() {
    const user = await axios({
      method: 'GET',
      url: '/users/me',
    })

    
    if (user.data) {
      this.setState({ user: { user: user.data }})
    }
    console.log(this.state.user)
  }

  logout = async () => {
    await axios({
      method: 'GET',
      url:'/users/logout'
    })
    this.setState({ user: null })
  }

  render() {
    const { user } = this.state
    
    return (
      <div className="App">
        <Layout>
          {
            !user &&
            <RegisterOrLogin updateUser={user => this.setState({ user })} />
          }

{
            user &&
            <RecipePage user={ user }/>
          }

          {/* {
            user &&
            <div>
              <ProfilePage user={user} />
              <button onClick={ this.logout }>Logout</button>
            </div>
          } */}
        </Layout>
      </div>
    )
  }
}

export default App
