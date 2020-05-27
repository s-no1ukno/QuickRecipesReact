import React from 'react'
import axios from 'axios'


import Recipe from './Recipe'

class RecipePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Recipes: null,
      note: '',
      users: {}
    }

    this.getUsers()
  }

  componentDidMount() {
    this.renderPosts()
  }
  
  getUsers = async () => {
    const res = await axios.get('/users')
    const response = res.data
    
    this.setState({ users: response })
  }
  
  renderPosts = async () => {
    
    const { user } = this.props
    
    try {
      let res = await axios.get('/recipes')
      const recipes = res.data
      this.setState({
        Recipes: recipes.map((recipe, i) => (
          <Recipe key={ i } rec={ recipe } me={ user } users={ this.state.users } />
          ))
        })
      } catch (err) {
        console.error(err)
      }
    }
    
    render() {
      
      
      
     
    return (
      <div>
        <h2>Recipes go here</h2>     
        
        { this.state.Recipes }
      
        {/* <Recipes /> */}
      </div>
    )
  }

}

export default RecipePage