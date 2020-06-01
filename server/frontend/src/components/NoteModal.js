import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import axios from 'axios'

const NoteModal = (props) => {
  const {
    buttonLabel,
    className,
    recId
  } = props

  const [modal, setModal] = useState(false)
  const [note, setNote] = useState('')

  const toggle = () => setModal(!modal)

  const handleSubmit = async () => {
    // const newMe = await axios.get('/users/me')
    let noteUserId = ''
    let me = ''

    // compare users/me against all users
    const m = await axios.get('/users/me')
    me = m.data

    const usersRes = await axios.get('/users')

    usersRes.data.map(user => {
      if (user.username === me) {
        noteUserId = user.id
      }
    })

    // Send user id for 'me' to strapi with note data
    const data = {
      Note: note,
      user: noteUserId,
      recipe: recId
    }
    
    await axios({
      method: 'POST',
      url: '/notes',
      data
    })
 
    setNote('')    
    window.location.reload()
  }

  return (
    <div>
      <Button color="warning" outline style={{ width: '100%' }} onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add A Note To Your Recipe</ModalHeader>
        <ModalBody>
          <form>
            <label htmlFor='note'>Note</label><br />
            <textarea name='note' id='note' onChange={e => setNote(e.target.value)} value={ note }/>  
          </form>        
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={handleSubmit}>Submit Your Note</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default NoteModal