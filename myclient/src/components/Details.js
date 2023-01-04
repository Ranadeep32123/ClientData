import React from "react";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmailIcon from "@mui/icons-material/Email";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { DeleteData } from "../context/context";

export default function Details() {
  const { deleteData, setDeleteData } = useContext(DeleteData);

  const navigate = useNavigate("");

  const deleteuser = async (id) => {
    const resp = await fetch(`http://localhost:8005/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deletedata = await resp.json();
    console.log(deletedata);

    if (resp.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      setDeleteData(deletedata);
      navigate("/");
    }
  };

  const [getData, setData] = useState([]);

  const { id } = useParams("");
  console.log(id);

  const getinfo = async (e) => {
    const res = await fetch(`http://localhost:8005/getuser/${id}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 404 || !data) {
      console.log("error");
    } else {
      setData(data);
    }
  };
  useEffect(() => {
    getinfo();
  }, []);

  return (
    <div className="container">
      {" "}
      <h2>Welcome {getData.name}</h2>
      <Card sx={{ maxWidth: 700 }}>
        <div className="row">
          <div className="left col-lg-10 col-md-10 col-12">
            {" "}
            <CardContent>
              <img src="/logo512.png" style={{ width: 50 }} alt="profile pic" />
              <h4 className="mt-3">
                Name:{" "}
                <span style={{ fontWeight: 400, fontSize: 20 }}>
                  {getData.name}
                </span>
              </h4>
              <h4>
                Age: <span style={{ fontWeight: 400, fontSize: 20 }}>29</span>
              </h4>
              <h4>
                <EmailIcon className="me-2" />
                Email:{" "}
                <span style={{ fontWeight: 400, fontSize: 20 }}>
                  {getData.email}
                </span>
              </h4>
              <h4>
                <SmartphoneIcon className="me-2" />
                Mobile:{" "}
                <span style={{ fontWeight: 400, fontSize: 20 }}>
                  {getData.mobile}
                </span>
              </h4>
            </CardContent>
          </div>
          <div className="right col-lg-2 col-md-2 col-12 ">
            <NavLink to={`../edit/${getData._id}`} end="true">
              <button className="btn btn-primary m-1">
                <ModeIcon />{" "}
              </button>
            </NavLink>

            <button
              className="btn btn-danger m-1"
              onClick={() => deleteuser(getData._id)}
            >
              <DeleteIcon />{" "}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
