import React, { useState } from 'react'
import { Card, CardTitle, CardText, Button } from 'reactstrap'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

const Recipe = props => {
  const { rec } = props
  const [notes, setNotes] = useState(rec.Notes)
  console.log(rec)

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await axios({
      method: 'PUT',
      url: `/recipes/${rec.id}`,
      data: {
        Notes: notes
      }
    })
    console.log(res)

  }

  const handleChange = e => {
    setNotes(e.target.value)
  }

  return (
    <div>
      <Card body inverse className='cards' style={{ backgroundColor: '#333', borderColor: '#333', width: '60vw'}}>
        <CardTitle>{ rec.Name }</CardTitle>
        <CardText>
          <ReactMarkdown source={ rec.Notes } />
        </CardText>
        <form onSubmit={ handleSubmit }>
          <textarea name="note" id="note" cols="30" rows="10" onChange={ handleChange }>
            { rec.Notes }
          </textarea>
          <Button color='primary' size='sm' outline>Click Here to Update Notes!</Button>
        </form>
      </Card>
    </div>
  )
}

export default Recipe