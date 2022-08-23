import { Button, Container, Row, Col, Table, Alert } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import InputField from "./Common/InputField";
import FirebaseDataServices from "./libs/DataServices";
import { useUserAuth } from "./Context/UserAuthContext";
import { useNavigate } from "react-router";
import { HashLoader } from "react-spinners";
const MianPage = () => {
  const navigate = useNavigate();
  const [Username, setUserName] = useState();
  const [EditItem, setEditItem] = useState("");
  const [toggle, setToggle] = useState(true);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [order,setOrder]=useState("ASC")
  const { user, logOut } = useUserAuth();
  console.log(user);
  useEffect(() => {
   
    getusers();
  }, []);
  const getusers = async () => {
    setLoading(true);
    const data = await FirebaseDataServices.getAllUser();
    console.log(data.docs);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false)
  };

  const HandleCreate = async (e) => {
    e.preventDefault();
    setMessage("");
    if (Username === "") {
      setMessage({ error: true, msg: "Enter UserName" });
      return;
    }
    const newUser = {
      Username,
    };
    try {
      await FirebaseDataServices.addUser(newUser);
      setMessage({ error: false, msg: "add sucess" });
      getusers();
    } catch (err) {
      setMessage({ error: false, msg: err.message });
    }
    setUserName("");
  };

  const updateUserName = async (newName) => {
    const newuser = {
      Username: newName,
    };
    console.log(newuser);
    await FirebaseDataServices.updateUser(EditItem, newuser);
    getusers();
    setToggle(true);
    setUserName("");
    setEditItem(null);
  };
  const deletHandler = async (id) => {
    await FirebaseDataServices.deleteUser(id);
    console.log("hello");
    getusers();
  };
  const editHandler = (id) => {
    let newEdit = users.find((el) => {
      return el.id == id;
    });
    setToggle(false);
    console.log(newEdit);
    setUserName(newEdit.Username);
    setEditItem(id);
  };
  const handleLogout = async () => {
    try {
      console.log("yes");
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  const sorting=(col)=>{

    if(order==="ASC"){
      const Sorted=[...users].sort((a,b)=>a[col].toLowerCase()>b[col].toLowerCase() ? 1 : -1);
      setOrder("DSC");
      setUsers(Sorted)
    }
    if(order==="DSC"){
      const Sorted=[...users].sort((a,b)=>a[col].toLowerCase()<b[col].toLowerCase() ? 1 : -1);
      setOrder("ASC")
      setUsers(Sorted)
    }

  }
  return (
    <div>
      {loading ? (<div className="loader">
        {/* <ClipLoader color={"red"} loading={loading} size={100}  /> */}
        <HashLoader color={"#09b0e3"} loading={loading} size={50}/>
        </div>
      ) : (
        <div style={{ paddingTop: "40px" }}>
          <Container>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h1>Crud App</h1>
              </div>
              <div>
                <Button variant="warning" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
            <hr />

            <Row>
              <Col md={8}>
                <h2 style={{ textAlign: "center", color: "blue" }}>
                  User Lists
                </h2>
                <div style={{ width: "40%", marginLeft: "440px" }}>
                  <InputField
                    type={"search"}
                    placeholder={"Search Here"}
                    value={search}
                    setValue={setSearch}
                  />
                </div>
                <br />
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th onClick={()=>sorting("id")} className='nameuse'>Id</th>
                      <th onClick={()=>sorting("Username")} className='nameuse'> Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users
                        .filter((a) =>
                          `${a.Username}`.toLowerCase(search).includes(search)
                        )
                        .map((doc, index) => {
                          return (
                            <tr key={doc.id}>
                              <td>{doc.id}</td>
                              <td>{doc.Username}</td>
                              <td>
                                <Button
                                  style={{
                                    backgroundColor: "#09b0e3",
                                    border: "0px solid #09b0e3",
                                  }}
                                  onClick={(e) => editHandler(doc.id)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="danger"
                                  style={{
                                    marginLeft: "5px",
                                    border: "0px solid red",
                                  }}
                                  onClick={(e) => deletHandler(doc.id)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </Table>
              </Col>

              <Col md={4}>
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
                <InputField
                  type={"text"}
                  placeholder={"user name"}
                  value={Username}
                  setValue={setUserName}
                />
                <div
                  style={{
                    paddingTop: "20px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {toggle ? (
                    <Button
                      type="submit"
                      className="btn btn-primary"
                      onClick={HandleCreate}
                    >
                      Add
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => updateUserName(Username)}
                    >
                      update
                    </Button>
                  )}
                </div>
                <br />
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default MianPage;
