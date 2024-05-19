
import './App.css';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
       <div className="font-mono bg-[url('./Images/Greenwallpaper.jpg')] bg-center bg-cover bg-fixed opacity-80 absolute left-0 right-0 top-0 bottom-0 m-auto overflow-auto">
        <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>
        </BrowserRouter>
      
      </div>
    </Provider>
   
  );
}

export default App;
