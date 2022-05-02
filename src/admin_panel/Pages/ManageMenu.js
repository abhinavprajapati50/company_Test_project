// import { FormControl, InputLabel } from "@mui/material";
// import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
// import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useConfirm } from "material-ui-confirm";
import { NavLink } from "react-router-dom";



const style = {
  position: "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 500,
  bgcolor: "background.paper",
  overflowY: "auto",
  border: "2px solid #000",
  marginTop: "10rem",
  p: 1,
  boxShadow: 24,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const modelstyle = {
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  overflowY: "auto",
  p: 5,
  boxShadow: 24,
};

export const ManageMenu = ({ setadminPanel }) => {
  const [title, setTitle] = useState("");
  const [parent_Menu, setparent_Menu] = useState(0);

  const [data, setdata] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const confirm = useConfirm();

  const getTheUsersFunction = async () => {
    let allMenu = await axios.get("https://reqres.in/api/users");
    console.log(allMenu.data.data);
    setdata(allMenu.data.data);

    return allMenu;
  }



  useEffect(() => {
    getTheUsersFunction()
  }, [])


  const deleteHandler = async (id) => {
    const deleteddata = data.filter((curData) => curData.id !== id);
    console.log(deleteddata);

    setdata(deleteddata)

  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Please enter a title");
      return;
    }
    try {
      const result = await axios.post(
        "http://localhost:5000/users",
        // "http://localhost:5000/admin/managemenu",
        {
          title: title,
          parent_Menu: parent_Menu,
        }
      );
      toast.success(result.data.message);
      setTitle("");
      setparent_Menu(0);
      setOpen(false);
      return result.data;
    } catch (error) {
      toast.error(error.message);
      console.log("error: " + error);
    }
  };

  // const updatedItemHandler = async (editHandler) => {
  //   e.preventDefault();
  //   // debugger;
  //   // if (!title) {
  //   //   toast.error("Plz Fill the all the field");
  //   //   return;
  //   // }

  //   try {
  //     console.log(data);
  //     // const formData = new FormData();

  //     // formData.append("title", title);
  //     // formData.append("parent_Menu", parent_Menu);
  //     // const result = await axios.put(
  //     //   `http://localhost:5000/admin/allmenu/${updateState}`,
  //     //   { title: title, parent_Menu: parent_Menu }
  //     // );
  //     // console.log(updateState);
  //     // toast.success("Menu sucessfully Updated");
  //     // closeUpdateModalHandler();

  //     // return result.data;
  //   } catch (error) {
  //     toast.error(error);
  //     console.log("error: " + error);
  //   }
  // };

  // const editHandler = (id) => {
  //   setupdate(true);
  //   setupdatedItemModal(true);
  //   const updatedDetails = data.find((curData) => curData.id === id);

  //   console.log("updatedDetails===-==-=-=-->", updatedDetails);
  //   setTitle(updatedDetails.title);
  //   setparent_Menu(updatedDetails.parent_Menu);
  //   setupdateState(updatedDetails.id);
  // };

  return (
    <>



      {/* ------------UPDATE END */}
      <div>
        <NavLink to="/adduser">

          <Button
            type="button"
            onClick={handleOpen}
            style={{ marginLeft: "58%", backgroundColor: "blue", color: "white" }}
          >
            Add User
          </Button>
        </NavLink>
        
      </div>

      <div>
      {data.length >0 &&   <TableContainer component={Paper} style={style}>
          <Table sx={{ minWidth: 900 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">first_name</StyledTableCell>
                <StyledTableCell align="center">Last_name</StyledTableCell>
                <StyledTableCell align="center">Avatar</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell align="center">{item.email}</StyledTableCell>
                  <StyledTableCell align="center">{item.first_name}</StyledTableCell>
                  <StyledTableCell align="center">{item.last_name}</StyledTableCell>
                  <StyledTableCell align="center">{item.avatar}</StyledTableCell>


                  <DeleteIcon
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => deleteHandler(item.id)}
                  />

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>}
      </div>
    </>
  );
};
