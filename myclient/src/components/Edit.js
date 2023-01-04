import React, { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { UpdateData } from "../context/context";

export default function Edit() {
  const { updateData, setUpdateData } = useContext(UpdateData);
  const navigate = useNavigate("");
  const [getUserData, setUserData] = useState([]);
  // console.log(getUserData);

  const [inpvalue, setInpval] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  const Setdata = (e) => {
    const { name, value } = e.target;

    setInpval((preval) => {
      console.log(preval);
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  // console.log(id);

  const getinfo = async () => {
    console.log("hi");
    const res = await fetch(`http://localhost:8005/getuser/${id}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);
    if (res.status === 404 || !data) {
      console.log("error");
    } else {
      setUserData(data);
      // console.log(data);

      // let newdata = getUserData;
      setInpval(data);
    }
  };
  console.log(getUserData);

  useEffect(() => {
    getinfo();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();
    const { name, email, mobile, address } = inpvalue;
    const resp = await fetch(`http://localhost:8005/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, mobile, address }),
    });
    console.log(resp);
    const data2 = await resp.json();
    console.log(data2);
    if (resp.status === 404 || !data2) {
      alert("fill the data");
    } else {
      alert("data added successfully");
      navigate("/");
      setUpdateData(data2);
    }
  };

  return (
    <div className="container">
      <NavLink to="/">Home</NavLink>
      <form className="mt-3">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={inpvalue.name}
              name="name"
              onChange={Setdata}
              className="form-control"
              id="exampleInputName"
              aria-describedby="NameHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Mobile
            </label>
            <input
              type="number"
              value={inpvalue.mobile}
              name="mobile"
              onChange={Setdata}
              className="form-control"
            />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={inpvalue.email}
              name="email"
              onChange={Setdata}
              className="form-control"
              id="exampleInputEmail"
            />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              value={inpvalue.address}
              name="address"
              onChange={Setdata}
              className="form-control"
            />
          </div>
        </div>

        <button
          type="submit"
          onClick={updateuser}
          className="btn btn-primary  "
        >
          Submit
        </button>
      </form>
    </div>
  );
}
