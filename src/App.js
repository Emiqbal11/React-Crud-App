import { Button } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import MianPage from "./Components/MianPage";
import Signup from "./Components/Signup";
// import { firestore } from "../src/Components/libs/firbase";
import { UserAuthContextProvider } from "./Components/Context/UserAuthContext";
import ProtectedRoute from './Components/ProtectedRoutes'
import AddUser from "./Components/AddUser";
import UserList from "./Components/UserList";
function App({children}) {
  return (
    <div>
      <UserAuthContextProvider>
        <BrowserRouter>
          <Routes>
          <Route
                path="/main"
                element={
                  <ProtectedRoute>
                    <MianPage />
                  </ProtectedRoute>
                }
              />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path='/add' element={<AddUser/>}/>
            <Route path='/userlist' element={<UserList/>}/>


           
          </Routes>
        </BrowserRouter>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
