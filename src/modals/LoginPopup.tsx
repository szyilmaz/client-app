import { Modal, Button } from 'react-bootstrap'

const LoginPopup = ({ showLogin }) => {
  return (
    <Modal show={showLogin}  centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <form method='POST'>
        <Modal.Body>
            <input type ='text' id="username" className="form-control"/>
            <input type ='password' id="password" className="form-control"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Kapat</Button>
          <Button type='submit' variant="primary">Giriş Yap</Button>
        </Modal.Footer>
        </form>
      </Modal>
  )
}

export default LoginPopup