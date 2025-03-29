import { HashRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Mylogin from "./login.js";
import Mysignup from "./signup.js";

function App() {
  return (
    <HashRouter>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand"> <i className="fa fa-shopping-bag"></i> Global Groupware Solutions Limited </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/"> Login </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/signup"> Sign Up </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route exact path="/" element={<Mylogin />} />
        <Route exact path="/signup" element={<Mysignup />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
