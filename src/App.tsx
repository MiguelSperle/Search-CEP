import Main from '../src/components/layout/main/index';
import './index.css';
import { ToastContainer } from 'react-toastify'; // lib de alert
import 'react-toastify/dist/ReactToastify.css'; // lib de alert

function App() {


  return (
    <>
    <Main title='Buscar CEP'/>
    <ToastContainer /> {/*  lib de alert  */}
    </>
  )
}

export default App
