import {  useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./admin_panel/Pages/Dashboard";
import { ManageMenu } from "./admin_panel/Pages/ManageMenu";
import { Navigate } from "react-router";
import { SideBar } from "./admin_panel/Sidebar";
import { Login } from "./components/Login";
// import { Home } from "./Client-Frontend/Home";
import { ConfirmProvider } from "material-ui-confirm";
import { AddUser } from "./admin_panel/Pages/AddUser";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  console.log("isLoggedIn ==>> ", isLoggedIn);
  return (
    <>
      {/* <ToastContainer /> */}
      {isLoggedIn && (

        <>


          <SideBar setIsLoggedIn={setIsLoggedIn} />
          <>
          {console.log("++++++++++++++++++logged in", isLoggedIn)}
            <Routes>
              <Route path="admins" element={<Dashboard />} />
              <Route path="users" element={<ConfirmProvider><ManageMenu /> </ConfirmProvider>} />
              <Route path="adduser" element={<AddUser />} />
              <Route path="*" element={<Navigate replace to="admins" />} />
            </Routes>
          </>
        </>
      )}

      {!isLoggedIn && (
        <>
          {console.log("-----------not logged in", isLoggedIn)}
          <Routes>
            <Route
              path="login"
              element={
                <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
              }
            />
            {/* <Route
                path="/"
                element={<Home isLoggedIn={isLoggedIn} />}
              />
              <Route path="*" element={<Navigate replace to="/login" />} /> */}
            {/* <Route path="*" element={<Navigate replace to="/login" />} /> */}
          </Routes>
        </>
      )}

    </>

  );
}
// {navigate("/")}

export default App;
