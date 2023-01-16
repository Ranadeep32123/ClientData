import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { useEffect } from "react";
import Store from "../context/context";
import { UpdateData } from "../context/context";
import { DeleteData } from "../context/context";
import { Pagination } from "../components/Pagination";

export default function Myhome(props) {
  const { userData, setUserData } = useContext(Store);
  const { updateData, setUpdateData } = useContext(UpdateData);
  const { deleteData, setDeleteData } = useContext(DeleteData);
  const [getuserData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postperpage, setPostPerPage] = useState([5]);

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

      getinformation();
    }
  };

  // console.log(getuserData.reverse());

  const getinformation = async (e) => {
    const res = await fetch("http://localhost:8005/getdata", {
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
      setLoading(true);
      setData(data.reverse());
    }
  };

  const indexOfLastPost = currentPage * postperpage;
  const indexOfFirstPost = indexOfLastPost - postperpage;
  const currentPosts = getuserData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    getinformation();
  }, []);

  return (
    <>
      {userData ? (
        <>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{userData.name}</strong> added successfully
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {updateData ? (
        <>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{updateData.name}</strong> updated successfully
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {deleteData ? (
        <>
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>{deleteData.name}</strong> deleted successfully
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 ">
            <NavLink className="btn btn-success" to="/register">
              New Entry
            </NavLink>
          </div>

          <table className="table mt-2">
            <thead>
              <tr className="table-dark">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Address</th>

                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((element, id) => {
                return (
                  <tr key={id}>
                    <th scope="row">
                      {(currentPage - 1) * postperpage + id + 1}
                    </th>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.mobile}</td>
                    <td>{element.address}</td>

                    <td className="d-flex justify-content-end ">
                      <NavLink to={`view/${element._id}`}>
                        <button className="btn btn-success mx-1">
                          <RemoveRedEyeIcon />
                        </button>
                      </NavLink>

                      <NavLink to={`edit/${element._id}`}>
                        {" "}
                        <button className="btn btn-primary mx-1">
                          <ModeIcon />{" "}
                        </button>
                      </NavLink>
                      <button
                        className="btn btn-danger mx-1"
                        onClick={() => deleteuser(element._id)}
                      >
                        <DeleteIcon />{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalpost={getuserData}
        postPerPage={postperpage}
        paginate={paginate}
      />
    </>
  );
}
//
