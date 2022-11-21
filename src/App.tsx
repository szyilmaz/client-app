import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Modal, Button} from 'react-bootstrap';

function App() {

  const link = 'http://localhost:5286/api/Artists';
  const [artists, setArtists] = useState([]);
  const [id, setId] = useState(0);
  const [isim, setIsim] = useState("");
  const [popup, setPopup] = useState({ show: false, _id: 0 });
  const [popupYeniKayit, setPopupYeniKayit] = useState({ showYeniKayit: false, kayitId: 0});

  const fetchData = async () => {
    const response = await axios.get(link);
    setArtists(response.data);
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
    //setName(name);
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
      <button className='btn btn-primary' onClick={() => handleYeniKayit(0,"")}>Yeni Kayıt</button>
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
        {popup.show && ( <Popup show={popup.show} handleDeleteTrue={handleDeleteTrue} handleDeleteFalse={handleDeleteFalse} /> )}
        {popupYeniKayit.showYeniKayit && ( <YeniKayitPopup name={isim} showYeniKayit={popupYeniKayit.showYeniKayit} handleNameChange={handleNameChange} handleSubmit={handleSubmit} handleSubmitCancel={handleSubmitCancel}/> )}
       
      </div>
    </>
  );
}

export default App;

const Popup =({ show, handleDeleteTrue, handleDeleteFalse }) => {
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
  );
}

//TODO
const YeniKayitPopup =({ showYeniKayit, handleSubmit, handleSubmitCancel, handleNameChange, name }) => {
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
  );
}
