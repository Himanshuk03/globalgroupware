import { toast , ToastContainer} from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";

const Mylogin = () =>{
    let[userinfo, setinfo] = useState({});

    const pickValue = (obj) =>{
        userinfo[obj.target.name] = obj.target.value;
        setinfo(userinfo);
    }

    const loginCheck = (frmobj) =>{
        toast("Please Wait Checking...");
        let loginstatus = false;
        frmobj.preventDefault();
        let url = "http://localhost:1003/account";
        fetch(url)
        .then(response=>response.json())
        .then(alluser =>{
            alluser.map((user, index)=>{
                if(user.email == userinfo.email && user.password == userinfo.password){
                    toast("Login Success.. Redirecting....");
                    loginstatus = true;
                    toast("Login Success... Redirecting to User page");
                    localStorage.setItem("id", user.id);
                    localStorage.setItem("name", user.fullname);
                    window.location.href="#/user";
                    window.location.reload();// reload the current page
                }
            })

            if(loginstatus == false){
                toast("Login Failed. Invalid or not filled or not exists..");
            }
        })
    }

    return(
        <div className="container mt-5">
            <ToastContainer/>
            <div className="row">
                <div className="col-xl-4"></div>
                <div className="col-xl-4">
                    <form onSubmit={loginCheck}>
                        <div className="card border-0 shadow-lg">
                            <div className="card-header"> 
                                <i className="fa fa-lock text-danger"></i> Login 
                                <Link className="float-end text-decoration-none" to="/signup"> 
                                    <i className="fa fa-user-plus"></i> Register 
                                </Link>
                            </div>

                            <div className="card-body"> 
                                <div className="mb-3">
                                    <p> e-Mail id </p>
                                    <input type="text" className="form-control" name="email" onChange={pickValue}/>
                                </div>
                                <div className="mb-3">
                                    <p> Password </p>
                                    <input type="password" className="form-control" name="password" onChange={pickValue}/>
                                </div>
                            </div>

                            <div className="card-footer text-center">
                                <button className="btn btn-danger"> 
                                    Login <i className="fa fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-xl-4"></div>
            </div>
        </div>
    )
}

export default Mylogin;