import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Store from "../context/context";

export default function Register() {
  const navigate = useNavigate("");
  const { userData, setUserData, bool } = useContext(Store);
  const [inpvalue, setInpval] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  const Setdata = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value, e.target.name);

    setInpval((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  function addformdata(e) {
    // console.log(inpvalue);

    e.preventDefault();
    const { name, email, mobile, address } = inpvalue;

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        mobile,
        address,
      }),
    };

    fetch("http://localhost:8005/register", request)
      .then(function (response) {
        if (response.status === 404) {
          alert("error in filling form");
          // console.log("hello");
        } else {
          alert("data added successfully");
          response.json().then((data) => setUserData(data));

          console.log(response.status);
          navigate("/");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    // if (!response.ok) {
    //   throw new Error(`Error! status: ${response.status}`);
    // }
    // const data = await response.json();
    // console.log(data);

    // const data = await response.json();
    // console.log(data);
    // if (response.status === 404 || !data) {
    //   alert("error if filling data");
    // } else {
    //   alert("data added successfully");
    // }
  }

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
          onClick={addformdata}
          className="btn btn-primary  "
        >
          Submit
        </button>
      </form>
    </div>
  );
}
