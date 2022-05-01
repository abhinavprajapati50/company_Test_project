// import React, { useEffect, useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";

// import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Avatar from "@mui/material/Avatar";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";

// import axios from "axios";
// import { useNavigate } from "react-router";
// // import { NavBar } from "./NavBar";
// // import { NavBar_Frontend } from "./NavBar-Frontend";

// const pages = ["Products", "Pricing", "Blog"];
// // const settings = ["Profile", "Account", "Dashboard", "Logout"];

// export const Home = ({ setIsLoggedIn, setadmin, admin, isLoggedIn }) => {
//   // const [anchorElNav, setAnchorElNav] = useState(null);
//   // const [menuData, setmenuData] = useState([]);
//   // const [childMenu, setchildMenu] = useState([]);
//   // const [anchorElUser, setAnchorElUser] = useState(null);
//   // const [subMenu, setsubMenu] = useState(false);

//   // const navigate = useNavigate();

//   // const handleChooseSubMenu = (id) => {
//   //   // console.log(id);
//   //   setsubMenu(true);
//   //   const childMenuData = menuData.filter((curMenu) =>
//   //     curMenu.parent_Menu === id ? curMenu.title : console.log("null")
//   //   );
//   //   setchildMenu(childMenuData);
//   //   setAnchorElNav(null);
//   // };

//   // console.log(childMenu);
//   // const logOutHandler = () => {
//   //   setIsLoggedIn(localStorage.removeItem("user", 0));
//   //   navigate("/", { return: true });
//   //   // return;
//   //   // window.location.reload();
//   // };

//   // useEffect(async () => {
//   //   let allMenu = await axios.get("http://localhost:5000/admin/allmenu");
//   //   setmenuData(allMenu.data.data);
//   //   return allMenu;
//   // }, []);

//   // const handlePopoverOpen = (event) => {
//   //   setAnchorElNav(event.currentTarget);
//   // };

//   // const handlePopoverClose = () => {
//   //   setAnchorElNav(null);
//   // };
//   // const handleOpenNavMenu = (event) => {
//   //   setAnchorElNav(event.currentTarget);
//   // };
  
//   return (
//     <>
//       {/* <NavBar_Frontend setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}  />  */}

//       <>
//     {/* <NavBar setAdmin={setadmin} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />; */}
//         <h1 style={{ marginLeft: "27rem" }}>WELCOME HOME PAGE FRONTEND</h1>
//         {/* {childMenu.map((curMenu) => (
//           <Button>{curMenu.title}</Button>
//         ))} */}
//       </>
//     </>
//   );
// };
