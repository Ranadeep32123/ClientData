import React, { Component, createContext } from "react";
import { useState } from "react";

const Store = createContext();
export const UpdateData = createContext();
export const DeleteData = createContext();

export const Mystate = (props) => {
  const [userData, setUserData] = useState("");
  const [updateData, setUpdateData] = useState("");
  const [deleteData, setDeleteData] = useState("");

  return (
    <Store.Provider value={{ userData, setUserData }}>
      <UpdateData.Provider value={{ updateData, setUpdateData }}>
        <DeleteData.Provider value={{ deleteData, setDeleteData }}>
          {props.children}
        </DeleteData.Provider>
      </UpdateData.Provider>
    </Store.Provider>
  );
};

export default Store;
