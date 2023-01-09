import axios from 'axios';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import LoginPopup from './LoginPopup';

const Login = () => {

    const [popupLogin, setPopupLogin] = useState({ showLogin: false });

    const handleLogin = () => {
        console.log("ALOOOOO");
        setPopupLogin({ showLogin: true });
      };
  //handleLoginSubmit
  const handleLoginSubmit = async () => {
    console.log("ORDAMISIN");

    await axios.post('http://localhost:5286/api/account/login', {
      username: "bob",
      password: "1234Aa.."
    })
    .then((res) => {
      console.log(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      toast.success("Giriş başarılı");
    })
    .catch((err) => {
      console.log(err.message);
    });

    setPopupLogin({ showLogin : false});
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
  };

  const handleLoginCancel = () => {
    setPopupLogin({ showLogin : false});
  };  

  return (
    <>
         <div className='container'>
         <button className='btn btn-primary' onClick={() => handleLogin()}>Login</button>
         &nbsp;&nbsp; <button className='btn btn-primary' onClick={() => handleLogout()}>Logout</button>
         </div>
         <ToastContainer />
         { popupLogin.showLogin && 
          (<LoginPopup showLogin={popupLogin.showLogin} handleLoginSubmit={handleLoginSubmit} handleLoginCancel={handleLoginCancel}/> )
        }
    </>
  )
}

export default Login