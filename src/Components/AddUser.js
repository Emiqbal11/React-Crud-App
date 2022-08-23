import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import InputField from "./Common/InputField";
import FirebaseDataServices from "./libs/DataServices";

const AddUser = ({ children,id, setUserId }) => {
  const [Username, setUserName] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (Username === "") {
      setMessage({ error: true, msg: "Mission Fail" });
      return;
    }
    const newUser = {
      Username,
    };
    console.log(newUser);
    try {
      if (id !== undefined && id !== "") {
        await FirebaseDataServices.updateUser(id, newUser);
        setUserId("");
        setMessage({ error: false, msg: "updated" });
      } else {
        await FirebaseDataServices.addUser(newUser);
        setMessage({ error: false, msg: "new user add" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
    setUserName("");
  };
  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await FirebaseDataServices.getUser(id);
      console.log("the record is :", docSnap.data());
      setUserName(docSnap.data().Username);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };
  useEffect(() => {
    console.log("the id here is :", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
    {children}
      <div className="p-4 box">
        <h2 style={{ color: "blue" }}>Add Users</h2>
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}
        <Form >
          <InputField
            type={"text"}
            placeholder={"user name"}
            value={Username}
            setValue={setUserName}
          />
        </Form>
        <div
          style={{
            paddingTop: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Add User/UpdateUser
          </Button>
        </div>
        <br />
      </div>
    </>
  );
};

export default AddUser;
