import React, { useState } from 'react'
import { Card, CardTitle, CardText, Button, CardHeader, Alert } from 'reactstrap'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import NoteModal from './NoteModal'

const Recipe = props => {
  const { rec } = props
  
  const getUsers = () => {
    const u = axios.get('/users')
    const data = u.data 
    return data 
  }

  const handleRatingSubmit = async () => {
    
  }  


  

  return (
    <div>
      <Card body inverse className='cards' style={{ backgroundColor: '#333', borderColor: '#333', width: '60vw'}}>
        <CardHeader>
          <CardTitle>{ rec.Name }</CardTitle>
          <small>{ rec.user.username }</small>
        </CardHeader>
        <div>
          <CardText>
            {
              rec.notes.map(note => {
                
                return (
                  <div>
                    <ReactMarkdown source={ note.Note } />
                    
                    {/* Broken here, somehow
                        issues with promise not resolving and user being undefined
                    */}
                    
                    {/* {
                     getUsers().map(user => {
                        if (user.id === note.user) {
                          return <small>{ user.username }</small>
                        }
                      })
                    } */}
                    <small> | { new Date(note.updated_at).toDateString() }</small><br />
                    <hr />
                  </div>
                )
              })
            }
          </CardText>
          {
            rec.Rating &&
            <CardText>Rating: { rec.Rating } Stars!</CardText>
          }
          {
            !rec.Rating &&
            <CardText>Rating: 0 Stars!</CardText>
          }
        </div>
        <NoteModal buttonLabel='Add A Note!' recId={ rec.id } recUser={ rec.user.id } />
        <Button color='warning' outline onClick={ handleRatingSubmit }>Update Rating</Button>
        <Button color='danger' size='lg'>Go To Recipe</Button>
      </Card>
    </div>
  )
}

export default Recipe