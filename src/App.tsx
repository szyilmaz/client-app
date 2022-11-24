import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeletePopup from './modals/DeletePopup';
import AddUpdatePopup from './modals/AddUpdatePopup';
import LoginPopup from './modals/LoginPopup';

function App() {

  const link = 'http://localhost:5286/api/Artists';
  const [artists, setArtists] = useState([]);
  const [id, setId] = useState(0);
  const [isim, setIsim] = useState("");
  const [popup, setPopup] = useState({ show: false, _id: 0 });
  const [popupYeniKayit, setPopupYeniKayit] = useState({ showYeniKayit: false, kayitId: 0});
  const [popupLogin, setPopupLogin] = useState({ showLogin: false });

  const fetchData = async () => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  
   if(token !== undefined) {
    axios.interceptors.request.use((config: any) => {
      if (token)
        config.headers.Authorization = `Bearer ${token}`;
         return config;
    });
    await axios
            .get(link)
            .then((res) => {
              setArtists(res.data);
            })
            .catch((error) =>{
              toast.error(error);
            });
   }
   else {
    setArtists([]);
   }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleNameChange = (e) => {
    setIsim(e.target.value);
  };

  const handleYeniKayit = (idd, name) => {
    console.log(idd, name);
    setPopupYeniKayit({ showYeniKayit: true, kayitId : idd});
    setId(idd);
    setIsim(name);
  };

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
      fetchData();
      toast.success("Giriş başarılı");
    })
    .catch((err) => {
      console.log(err.message);
    });

    setPopupLogin({ showLogin : false});
  };

  const handleLogout = () => {
    setArtists([]);
    localStorage.removeItem('user');
  };

  const handleLoginCancel = () => {
    setPopupLogin({ showLogin : false});
  };

  const handleSubmitCancel = () => {
    setPopupYeniKayit({ showYeniKayit: false, kayitId : 0});
    setIsim('');
  };

  const handleDelete = (idd) => {
    console.log(idd);
     setPopup({ show: true, _id : idd});
     console.log(popup);
  };

const handleDeleteTrue = async () => {
  if (popup.show && popup._id) {
  await axios
    .delete(link+ '/' + popup._id)
    .then((res) => {
      let artistsRemaining = artists.filter((item) => item.id !== popup._id);
      setArtists(artistsRemaining);
      toast.success('Kayıt Silindi')
    })
    .catch((err) => {
      console.log(err.message);
    });
    setPopup({
      show: false,
      _id: 0,
    });
  }
}

const handleDeleteFalse = () => {
   setPopup({
     show: false,
     _id: 0,
   });
 };

const handleSubmit = async (e) => {
    e.preventDefault();
    if(popupYeniKayit.kayitId === 0) {
      await axios.post(link, {
        name: isim
      })
      .then((res) => {
        const newArtists = artists.concat(res.data);
        setArtists(newArtists);
        toast.success("Yeni kayıt eklendi!");
      })
      .catch((err) => {
        console.log(err.message);
      });
    } else {
      await axios.put(link+ '/' + id, {
        name: isim
      })
      .then((res) => {
        toast.success("Varolan kayıt düzenlendi!");
      })
      .catch((err) => {
        console.log(err.message);
      });
      const response = await axios.get(link);
      setArtists(response.data);
    }
    setId(0);
    setIsim('');
    setPopupYeniKayit({ showYeniKayit: false, kayitId : 0});
};

return (
    <>
      <div className='container'>
      <br />
      <button className='btn btn-primary' onClick={() => handleYeniKayit(0,"")}>Yeni Kayıt</button> &nbsp; <button className='btn btn-primary' onClick={() => handleLogin()}>Login</button>&nbsp; <button className='btn btn-primary' onClick={() => handleLogout()}>Logout</button>
      </div>
      <br />
      <div className='container'>
        <table className='table table-bordered table-condensed'>
          <thead>
            <tr>
              <td>Adi</td>
              <td>İşlem</td>
            </tr>
          </thead>
          <tbody>
            {artists.map(artist =>
              <tr key={artist.id}>
                <td>{artist.name}</td>
                <td>
                  <button className='btn btn-info' onClick={() => handleYeniKayit(artist.id, artist.name)}>Update</button>
                  &nbsp;
                  <button className='btn btn-danger' onClick={() => handleDelete(artist.id)}>Remove</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <ToastContainer />
        { popup.show && 
          (<DeletePopup show={popup.show} handleDeleteTrue={handleDeleteTrue} handleDeleteFalse={handleDeleteFalse} /> )
        }
        { popupYeniKayit.showYeniKayit && 
          (<AddUpdatePopup name={isim} showYeniKayit={popupYeniKayit.showYeniKayit} handleNameChange={handleNameChange} handleSubmit={handleSubmit} handleSubmitCancel={handleSubmitCancel}/> )
        }
        { popupLogin.showLogin && 
          (<LoginPopup showLogin={popupLogin.showLogin} handleLoginSubmit={handleLoginSubmit} handleLoginCancel={handleLoginCancel}/> )
        }
      </div>
    </>
  );
}

export default App;