import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const AddUpdatePopup = ({ showYeniKayit, handleSubmit, handleSubmitCancel, handleNameChange, name }) => {
  return (
    <Modal show={showYeniKayit} onHide={handleSubmitCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Kayıt Ekle/Düzenle</Modal.Title>
        </Modal.Header>
        <form method='POST'>
        <Modal.Body>
            <input type ='text' id="xxx" className="form-control" onChange={handleNameChange} value={name} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSubmitCancel}>Kapat</Button>
          <Button type='submit' variant="primary" onClick={handleSubmit}>Kaydet</Button>
        </Modal.Footer>
        </form>
      </Modal>
  )
}

export default AddUpdatePopup