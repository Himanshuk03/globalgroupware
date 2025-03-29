import { toast , ToastContainer} from "react-toastify";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Register = () =>{
    let[newuser, setUser] = useState( {} );
    //let[allerror, setError] = useState( {nameerror:"", mobileerror:"", emailerror:"", passworderror:""} );

    let[nameerror, setNameError] = useState("");
    let[emailerror, setEmailError] = useState("");
    let[passworderror, setPasswordError] = useState("");

    const pickValue = (obj) =>{
        newuser[obj.target.name] = obj.target.value;
        setUser(newuser); // values got updated in state
    }

    const save = (frmobj) =>{
        frmobj.preventDefault();
        let formstatus = true;

        if( ! newuser.fname || newuser.fname ==="" ){
            setNameError("Invalid name");
            formstatus = false;
        }else{ 
            setNameError("") 
        }

        //email validation 
        var epattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                    // test123_95 @   gmail        .   com
                    // username + @ + domainname + . + extension 

        if( !epattern.test(newuser.email) )
        {
            setEmailError("Invalid Email id")
            formstatus = false;
        }else{
            setEmailError("");
        }

        //password validation 
        if( ! newuser.password || newuser.password ==="" || newuser.password.length <6 ){
            setPasswordError("Invalid Password")
            formstatus = false;
        }else{
            setPasswordError("");
        }

        if(formstatus === true){
            let url = "http://localhost:1003/account";
            let postdata = {
                headers:{'Content-type':'application/json'},
                method:'post',
                body:JSON.stringify(newuser)
            }
            fetch(url, postdata)
            .then(response=>response.json())
            .then(info=>{
                toast("Account Created ...");
                frmobj.target.reset();
            })
        }
    }

    return(
        <div className="container mt-5">
            <ToastContainer></ToastContainer>
            <div className="row">
                <div className="col-xl-4"></div>
                <div className="col-xl-4">
                    <form onSubmit={save}>
                    <div className="card border-0 shadow-lg">
                        <div className="card-header"> 
                            <i className="fa fa-user-plus text-danger"></i> Register 
                            <Link className="float-end text-decoration-none" to="/"> 
                                <i className="fa fa-lock"></i> Login 
                            </Link>
                        </div>

                        <div className="card-body"> 
                            <div className="mb-3">
                                <p> Full Name </p>
                                <input type="text" className="form-control" name="fname" onChange={pickValue}/>
                                <small className="text-danger"> {nameerror} </small>
                            </div>

                            <div className="mb-3">
                                <p> e-Mail id </p>
                                <input type="text" className="form-control" name="email" onChange={pickValue}/>
                                <small className="text-danger"> {emailerror} </small>
                            </div>
                            
                            <div className="mb-3">
                                <p> Password </p>
                                <input type="password" className="form-control" name="password" onChange={pickValue}/>
                                <small className="text-danger"> {passworderror} </small>
                            </div>   
                        </div>

                        <div className="card-footer text-center">
                            <button className="btn btn-danger"> 
                                Submit <i className="fa fa-arrow-right"></i>
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

export default Register;