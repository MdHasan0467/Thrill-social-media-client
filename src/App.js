import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import Route from './components/Routes/Route/Route';
import 'react-photo-view/dist/react-photo-view.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <div className="App bg-slate-100">
      <Route></Route>
      <ToastContainer />
    </div>
  );
}

export default App;
