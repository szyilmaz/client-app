import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import AddUpdatePopup from './AddUpdatePopup';
import DeletePopup from './DeletePopup';

const Artist = () => {

    const link = 'http://localhost:5286/api/Artists';
    const [artists, setArtists] = useState([]);
    const [id, setId] = useState(0);
    const [isim, setIsim] = useState("");
    const [popup, setPopup] = useState({ show: false, _id: 0 });
    const [popupYeniKayit, setPopupYeniKayit] = useState({ showYeniKayit: false, kayitId: 0});

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
            toast.error(err.message);
        });
      } else {
        await axios.put(link+ '/' + id, {
          name: isim
        })
        .then((res) => {
          toast.success("Varolan kayıt düzenlendi!");
        })
        .catch((err) => {
            toast.error(err.message);
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
        { popup.show && 
          (<DeletePopup show={popup.show} handleDeleteTrue={handleDeleteTrue} handleDeleteFalse={handleDeleteFalse} /> )
        }
        { popupYeniKayit.showYeniKayit && 
          (<AddUpdatePopup name={isim} showYeniKayit={popupYeniKayit.showYeniKayit} handleNameChange={handleNameChange} handleSubmit={handleSubmit} handleSubmitCancel={handleSubmitCancel}/> )
        }
       
      </div>
   </>
  )
}

export default Artist