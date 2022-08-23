import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useUserAuth } from "./Context/UserAuthContext";
import FirebaseDataServices from "./libs/DataServices";

const UserList = ({getUserId}) => {
    const[users,SetUsers]=useState([]);
   const{user,logOut}=useUserAuth()

    useEffect(()=>{
        getUsers();
    },[]);
    const getUsers=async () =>{
        const data=await FirebaseDataServices.getAllUser();
        console.log(data.docs);
        SetUsers(data.docs.map((doc)=>({...doc.data(),id: doc.id})));

    };
    const deleteHandler=async (id)=>{
        await FirebaseDataServices.deleteUser(id);
        getUsers();
    }
    const handleLogout=async ()=>{
        try{
          console.log("yes")
          await logOut();
    
        }catch(err){
          console.log(err.message)
        }
    
    
      }
  return (
    <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h1>Crud App</h1>
            </div>
            <div>
              <Button variant="warning" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
          <hr />

  <div className="mb-2">
        <Button variant="dark edit" onClick={getUsers}>
          Refresh List
        </Button>
      </div>

          <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((doc, index) => {
                    return (
                      <tr key={doc.id}>
                        <td>{index + 1}</td>
                        <td>{doc.Username}</td>
                        <td>
                          <Button
                            style={{
                              backgroundColor: "#09b0e3",
                              border: "0px solid #09b0e3",
                            }}
                            onClick={(e) => getUserId(doc.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            style={{
                              marginLeft: "5px",
                              border: "0px solid red",
                            }}
                            onClick={(e) => deleteHandler(doc.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                    })}
                </tbody>
              </Table>
    </>
  )
}

export default UserList