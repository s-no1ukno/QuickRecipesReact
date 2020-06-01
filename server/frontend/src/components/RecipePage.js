import React from 'react'
import axios from 'axios'


import Recipe from './Recipe'

class RecipePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Recipes: null,
      note: '',
    }

  }

  componentDidMount() {
    this.renderPosts()
    // this.getUsers()

    console.log('Recipe page props.user', this.props.user)
    console.log('Recipe page state.users', this.state.users)
  }
  
  getUsers = async () => {
    const res = await axios.get('/users')
    const response = res.data
    
    this.setState({ users: response })
  }
  
  renderPosts = async () => {
    
    try {
      let res = await axios.get('/recipes')
      const recipes = res.data
      this.setState({
        Recipes: recipes.map((recipe, i) => (
          <Recipe key={ i } rec={ recipe } />
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