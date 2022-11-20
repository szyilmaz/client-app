import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [artists, setArtists] = useState([]);
  const [isim, setIsim] = useState('');
  const [id, setId] = useState(0);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:5286/api/Artists');
    setArtists(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleNameChange = (e) => {
    setIsim(e.target.value);
  };

  const handleUpdate = (id, name) => {
    console.log(id);
    let myName = document.getElementById('name');
    (myName as HTMLInputElement).value = name; 

    setId(id);
    setIsim(name);
  };

  const handleRemove = async (id) => {
    await axios
      .delete('http://localhost:5286/api/Artists/' + id)
      .then((res) => {
        let artistsRemaining = artists.filter((item) => item.id !== id);
        setArtists(artistsRemaining);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(id === 0) {
      await axios.post('http://localhost:5286/api/Artists', {
        name: isim
      })
      .then((res) => {
        const newArtists = artists.concat(res.data);
        setArtists(newArtists);
      })
      .catch((err) => {
        console.log(err.message);
      });
    } else {
      await axios.put('http://localhost:5286/api/Artists/' + id, {
        name: isim
      })
      .then((res) => {
        
      })
      .catch((err) => {
        console.log(err.message);
      });
      const response = await axios.get('http://localhost:5286/api/Artists');
      setArtists(response.data);
    }
    let myName = document.getElementById('name');
    (myName as HTMLInputElement).value = ''; 
    setId(0);
    setIsim('');
  };

  return (
    <>
      <div className='container'>
        <form action='POST'>
          <table className='table table-bordered table-condesed'>
          <tbody>
            <tr>
              <td> <input type="text" className="form-control" id="name" name="name" onChange={handleNameChange} style={{ width: "300px" }} /></td>
              <td><button type="submit" className='btn btn-primary' onClick={handleSubmit}>Ekle</button></td>
            </tr>
          </tbody>
          </table>
        </form>
      </div>
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
                <td><button className='btn btn-info' onClick={() => handleUpdate(artist.id, artist.name)}>Update</button>&nbsp;<button className='btn btn-danger' onClick={() => handleRemove(artist.id)}>Remove</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
