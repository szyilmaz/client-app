import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../../features/account/Login';
import Artist from '../../features/artist/Artist';

function App() {

return (
    <>
      <Login />
      <Artist />
    </>
  );
}

export default App;