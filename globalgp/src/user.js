import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";

const Myuser = () => {

    let [alluser, setuser] = useState([]);
    let [order, setOrder] = useState("asc");

    const getuser = () => {
        fetch("http://localhost:1003/users")
            .then(response => response.json())
            .then(userArray => {

                if (order == "asc") {
                    userArray.sort((a, b) => { return a.fullname.localeCompare(b.fullname) })
                    setuser(userArray);
                    setOrder("desc");
                } else {
                    userArray.sort((a, b) => { return b.fullname.localeCompare(a.fullname) })
                    setuser(userArray);
                    setOrder("asc");
                }

            });
    }
    useEffect(() => {
        getuser();
    }, []);

    let [ufullname, setufullname] = useState("");
    let [uemail, setuemail] = useState("");
    let [umobile, setumobile] = useState("");
    let [uaddress, setuaddress] = useState("");
    let [uphoto, setuphoto] = useState("");
    let [msg, fnmsg] = useState("");

    const deluser = (id) => {
        let postdata = { method: "delete" };
        // console.log(id);
        fetch("http://localhost:1003/users/" + id, postdata).then(response => response.json()).then(info => {
            // alert(info.message);
            fnmsg("User with Id : " + id + " Deleted Successfully");
            toast("User name '" + info.fullname + "' Deleted Successfully");
            getuser();
            // datamsg();
        });
    };

    let [nameerror, setNameError] = useState("");
    let [emailerror, setEmailError] = useState("");
    let [mobileerror, setMobileError] = useState("");
    let [photoerror, setPhotoError] = useState("");

    const save = () => {
        // alert(uname+uemail+umobile);
        if (userid == "") {
            let formstatus = true;

            if (!ufullname || ufullname === "") {
                setNameError("Invalid name");
                formstatus = false;
            } else {
                setNameError("")
            }

            //email validation 
            var epattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            // test123_95 @   gmail        .   com
            // username + @ + domainname + . + extension 

            if (!epattern.test(uemail)) {
                setEmailError("Invalid Email id")
                formstatus = false;
            } else {
                setEmailError("");
            }

            // mobile validation 
            var mpattern = /^[0]?[6789]\d{9}$/;
            if (!mpattern.test(umobile)) {
                setMobileError("Invalid mobile no");
                formstatus = false;
            } else {
                setMobileError("");
            }

            if (!uphoto) {
                setPhotoError("Enter Profile Photo Url")
                formstatus = false;
            } else {
                setPhotoError("");
            }

            if (formstatus === true) {
                let url = "http://localhost:1003/users";
                let data = { "fullname": ufullname, "email": uemail, "mobile": umobile, "address": uaddress, "photo": uphoto };
                let postdata = {
                    headers: { "Content-Type": "application/json" },
                    method: "post",
                    body: JSON.stringify(data)
                }
                fetch(url, postdata).then(response => response.json()).then(info => {
                    fnmsg("New Id is : " + info._id);
                    toast("Saved Successfully.....! ");
                    // getuser(); this getuser() is required when there is no useEffect.
                })
                setuemail(""); setumobile(""); setufullname(""); setuaddress(""); setuphoto("");
            }
        }
        else {
            updateuserinfo();
        }
    }

    let [userid, updateid] = useState("");
    const edituser = (user) => {
        // console.log(user);
        setufullname(user.fullname); // using material, giving data into user.
        setumobile(user.mobile);
        setuemail(user.email);
        setuaddress(user.address);
        setuphoto(user.photo);
        updateid(user.id);
    };

    const updateuserinfo = () => {
        alert(userid);
        let formstatus = true;

        if (!ufullname || ufullname === "") {
            setNameError("Invalid name");
            formstatus = false;
        } else {
            setNameError("")
        }

        //email validation 
        var epattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        // test123_95 @   gmail        .   com
        // username + @ + domainname + . + extension 

        if (!epattern.test(uemail)) {
            setEmailError("Invalid Email id")
            formstatus = false;
        } else {
            setEmailError("");
        }

        // mobile validation 
        var mpattern = /^[0]?[6789]\d{9}$/;
        if (!mpattern.test(umobile)) {
            setMobileError("Invalid mobile no");
            formstatus = false;
        } else {
            setMobileError("");
        }

        if (!uphoto) {
            setPhotoError("Enter Profile Photo Url")
            formstatus = false;
        } else {
            setPhotoError("");
        }

        if (formstatus === true) {
            let url = "http://localhost:1003/users/" + userid;
            let data = { "fullname": ufullname, "email": uemail, "mobile": umobile, "address": uaddress, "photo": uphoto, "id": userid };
            let postdata = {
                headers: { "Content-Type": "application/json" },
                method: "PUT",
                body: JSON.stringify(data)
            };
            fetch(url, postdata).then(response => response.json()).then(info => {
                toast("Updated Successfully.....!");
                getuser();
                setuemail(""); setumobile(""); setufullname(""); setuaddress(""); setuphoto("");
            });
        }

    };


    let [keyword, setKeyword] = useState("");

    const PER_PAGE = 4; //displays 5 items/records per page
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(alluser.length / PER_PAGE);

    return (
        <div className="container mt-5">
            <ToastContainer></ToastContainer>
            <div className="row">
                <div className="col-xl-12">

                    <div className="row mb-5">
                        <h3 className="col-xl-4">User List</h3>
                        <div className="col-xl-3">
                            <select className="form-select" onChange={getuser}>
                                <option> Name alphabetically ascending</option>
                                <option> Name alphabetically descending </option>
                            </select>
                        </div>
                        <div className="col-xl-5">
                            <input type="text" className="form-control" placeholder="Search..."
                                onChange={obj => setKeyword(obj.target.value)} />
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-lg-3">
                            <label> User Full Name </label>
                            <input type="text" className="form-control" onChange={obj => setufullname(obj.target.value)} value={ufullname} />
                            <small className="text-danger">{nameerror} </small>
                        </div>
                        <div className="col-lg-3">
                            <label>Email-Id </label>
                            <input type="text" className="form-control" onChange={obj => setuemail(obj.target.value)} value={uemail} />
                            <small className="text-danger">{emailerror} </small>
                        </div>
                        <div className="col-lg-2">
                            <label>Mobile </label>
                            <input type="text" className="form-control" onChange={obj => setumobile(obj.target.value)} value={umobile} />
                            <small className="text-danger">{mobileerror} </small>
                        </div>
                        <div className="col-lg-2">
                            <label>Address</label>
                            <input type="text" className="form-control" onChange={obj => setuaddress(obj.target.value)} value={uaddress} />
                        </div>
                        <div className="col-lg-2">
                            <label>Photo</label>
                            <input type="text" className="form-control" onChange={obj => setuphoto(obj.target.value)} value={uphoto} />
                            <small className="text-danger">{photoerror} </small>
                        </div>
                        <div className="text-center mt-2 mb-5">
                            <button onClick={save}>Save-it</button>
                        </div>
                        <small className="text-center text-danger">{msg}</small>

                    </div>

                    <table className="table table-bordered">
                        <thead >
                            <tr >
                                <th>User. ID</th>
                                <th>User Full Name</th>
                                <th>Email-ID</th>
                                <th>Mobile No.</th>
                                <th>Address</th>
                                <th>Avataar</th>
                                <th>Modify</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                alluser.slice(offset, offset + PER_PAGE).map((userarr, index) => {
                                    if (userarr.fullname.toLowerCase().match(keyword.toLowerCase()) ||
                                        userarr.email.toString().match(keyword) ||
                                        userarr.mobile.toLowerCase().match(keyword.toLowerCase())
                                    )
                                        return (
                                            <tr key={index}>
                                                <td>{userarr.id}</td>
                                                <td>{userarr.fullname}</td>
                                                <td>{userarr.email}</td>
                                                <td>{userarr.mobile} </td>
                                                <td>{userarr.address}</td>
                                                <td> <img src={userarr.photo} height="80" width="120" alt="userimg" /></td>
                                                <td>
                                                    <button onClick={edituser.bind(this, userarr)} className="btn btn-warning me-3">Edit</button>
                                                    <button onClick={deluser.bind(this, userarr.id)} className="btn btn-danger">Delete</button>
                                                </td>

                                            </tr>
                                        )

                                })
                            }
                        </tbody>
                    </table>
                    <div className="mt-4 text-center">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination  justify-content-center"}
                            pageClassName={"page-item "}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active primary"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Myuser;