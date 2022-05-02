import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";
import { Dashboard } from "./Pages/Dashboard";
import { ManageMenu } from "./Pages/ManageMenu";
import { SideBar } from "./Sidebar";
import { ConfirmProvider } from "material-ui-confirm";
import { AddUser } from "./Pages/AddUser";

export const Admin_Routes = ({
  setIsLoggedIn,
  setadmin,
  admin,
  isLoggedIn,
}) => {
  // useEffect(() => {
  //   setadmin(true);
  // }, [admin]);
  return (
    <div>
      {/* {console.log(window.location.pathname} */}
      <>
        {/* {window.location.pathname === "/" ? (
          <NavBar setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <SideBar setIsLoggedIn={setIsLoggedIn} />
        )} */}

        <SideBar setIsLoggedIn={setIsLoggedIn} setAdmin={setadmin} />
        <>
          <Routes>
            <Route path="admin" element={<Dashboard />} />
            <Route path="users" element={<ConfirmProvider><ManageMenu /> </ConfirmProvider>} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="*" element={<Navigate replace to="/admin" />} />
          </Routes>
        </>
      </>
    </div>
  );
};
