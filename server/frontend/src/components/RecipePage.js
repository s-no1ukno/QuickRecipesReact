import React from 'react'
import axios from 'axios'

import {
  Card,
  CardTitle,
  CardText,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'

import Recipe from './Recipe'

class RecipePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Recipes: null,
      note: ''
    }

  }

  componentDidMount() {
    this.renderPosts()
  }


  // handleSubmit = e => {
  //   e.preventDefault()

  //   const { note } = this.state
  //   console.log(note)
  //   console.log(e.target)

  // } 

  // handlechange = e => {
  //   this.setState({
  //     note: e.target.value
  //   })

  //   console.log(this.state)
  // }

  renderPosts = async () => {

    try {
      let res = await axios.get('/recipes')
      const recipes = res.data
      this.setState({
        Recipes: recipes.map((recipe, i) => (
          // <Card key={i} body inverse className='cards' style={{ backgroundColor: '#333', borderColor: '#333', width: '60vw'}}>
          //   <CardTitle>{ recipe.Name }</CardTitle>
          //   <CardText>
          //     { recipe.Notes }
          //   </CardText>

          //   <form onSubmit={ this.handleSubmit }>
          //     <textarea name="note" id="note" cols="30" rows="10" onChange={ this.handlechange }></textarea>
          //     <Button color='primary' size='sm' outline>Click Here to See Recipe</Button>
          //   </form>
            
          // </Card>

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
        
        {this.state.Recipes}
      
        {/* <Recipes /> */}
      </div>
    )
  }

}

export default RecipePage