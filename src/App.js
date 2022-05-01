import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./admin_panel/Pages/Dashboard";
import { ManageMenu } from "./admin_panel/Pages/ManageMenu";
import { Navigate } from "react-router";
// import { Dashboard } from "./admin_panel/Pages/Dashboard";
import { SideBar } from "./admin_panel/Sidebar";
import { Login } from "./components/Login";
import { ToastContainer } from "react-toastify";
import { Home } from "./Client-Frontend/Home";
import { Admin_Routes } from "./admin_panel/Admin_Routes";
import { ConfirmProvider } from "material-ui-confirm";
import { AddUser } from "./admin_panel/Pages/AddUser";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [admin, setadmin] = useState(false);
  console.log("isLoggedIn ==>> ", isLoggedIn);
  return (
    <>
      {/* <ToastContainer /> */}
      {isLoggedIn && (
        // <>
        //   <Admin_Routes
        //     setIsLoggedIn={setIsLoggedIn}
        //     setadmin={setadmin}
        //     admin={admin}
        //   />
        // </>
        <>


          <SideBar setIsLoggedIn={setIsLoggedIn} setAdmin={setadmin} />
          <>
            <Routes>
              <Route path="admin" element={<Dashboard />} />
              <Route path="admin/managemenu" element={<ConfirmProvider><ManageMenu /> </ConfirmProvider>} />
              <Route path="adduser" element={<AddUser />} />
              <Route path="*" element={<Navigate replace to="/admin" />} />
            </Routes>
          </>
        </>
      )}
      {/* {isLoggedIn && !admin && (
        )} */}
      {!isLoggedIn && (
        <>
          {/* <Frontend_Route
            setIsLoggedIn={setIsLoggedIn}
            setadmin={setadmin}
            admin={admin}
          /> */}
          <Routes>
            <Route
              path="login"
              element={
                <Login setIsLoggedIn={setIsLoggedIn} setadmin={setadmin} />
              }
            />
            <Route
              path="/"
              element={<Home setadmin={setadmin} isLoggedIn={isLoggedIn} />}
            />

            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </>
      )}
      {/* {isLoggedIn ? (
        <>
          {admin && (
            <Admin_Routes
              setIsLoggedIn={setIsLoggedIn}
              setadmin={setadmin}
              admin={admin}
            />
          )}
          {!admin && (
            <Frontend_Route
              setIsLoggedIn={setIsLoggedIn}
              setadmin={setadmin}
              admin={admin}
            />
          )}
        </>
      ) : (
        <>
          <Routes>
            <Route
              path="login"
              element={
                <Login setIsLoggedIn={setIsLoggedIn} setadmin={setadmin} />
              }
            />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        </>
      )} */}
    </>
    // <>
    //   <div className="App">
    //     <>
    //       <ToastContainer />
    //       {/* <Routes>
    //       </Routes> */}
    //       {isLoggedIn ? (
    //         <>
    //           <Admin_Routes setIsLoggedIn={setIsLoggedIn} />

    //         </>
    //       ) : (
    //         <>
    //           <Routes>
    //             <Route
    //               path="login"
    //               element={<Login setIsLoggedIn={setIsLoggedIn} />}
    //             />
    //             <Route path="*" element={<Navigate replace to="/login" />} />
    //           </Routes>
    //         </>
    //       )}
    //     </>
    //   </div>
    // </>
  );
}
// {navigate("/")}

export default App;
