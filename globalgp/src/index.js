import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Myusermodule from './usermodule';

const root = ReactDOM.createRoot(document.getElementById('root'));

if(localStorage.getItem("id") == null){
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}else{
  root.render(
    <React.StrictMode>
      <Myusermodule />
    </React.StrictMode>
  );
};
reportWebVitals();
