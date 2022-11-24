import { Modal, Button } from 'react-bootstrap'

const LoginPopup = ({ showLogin, handleLoginSubmit, handleLoginCancel }) => {
  return (
    <Modal show={showLogin} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <input type ='text' id="username" className="form-control"/>
            <br />
            <input type ='password' id="password" className="form-control"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLoginCancel}>Kapat</Button>
          <Button type='button' variant="primary" onClick={handleLoginSubmit}>Giriş Yap</Button>
        </Modal.Footer>
      </Modal>
  )
}

export default LoginPopup