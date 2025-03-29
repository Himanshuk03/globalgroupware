import { HashRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Myuser from "./user";

const Myusermodule=()=> {
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
                                <Link className="nav-link active" to="/user"> Users </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" onClick={logout}> 
                                    Welcome : '{localStorage.getItem("name") }' - <i className="fa fa-power-off"></i> <small className="text-decoration-underline text-warning">Log Out</small>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route exact path="/user" element={<Myuser />} />
            </Routes>
        </HashRouter>
    );
}

export default Myusermodule;


const logout = () =>{
    localStorage.clear(); // delete everything from localstorage
    window.location.href="#/"; // to redirect to main url 
    window.location.reload(); // reload the page
}