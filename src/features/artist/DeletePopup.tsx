import { Modal, Button } from 'react-bootstrap'

const DeletePopup = ({ show, handleDeleteTrue, handleDeleteFalse }) => {
  return (
    <Modal show={show} onHide={handleDeleteFalse} centered>
        <Modal.Header closeButton>
          <Modal.Title>Uyarı</Modal.Title>
        </Modal.Header>
        <Modal.Body>Seçmiş olduğunuz kayıt silinecektir, Devam etmek istiyor musunuz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteFalse}>Kapat</Button>
          <Button type='submit' variant="danger" onClick={handleDeleteTrue}>Onayla</Button>
        </Modal.Footer>
      </Modal>
  )
}

export default DeletePopup