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
  top: "50%",
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


const UpdateMenuModelStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  overflowY: "auto",
  p: 1,
  boxShadow: 24,
};

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
  const [update, setupdate] = useState(false);
  const [updatedItemModal, setupdatedItemModal] = useState(false);
  const [updateState, setupdateState] = useState("");

  const [data, setdata] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const confirm = useConfirm();



  const openUpdateModalHandler = () => {
    setOpen(false);
    setupdatedItemModal(true);
  };
  const closeUpdateModalHandler = () => {
    setTitle("");
    setparent_Menu(0);
    setupdatedItemModal(false);
  };

  const getTheUsersFunction = async () => {
    let allMenu = await axios.get("https://reqres.in/api/users?page=2");
    console.log(allMenu.data.data);
    setdata(allMenu.data.data);

    return allMenu;
  }



  useEffect(() => {
    getTheUsersFunction()
  }, [])


  const deleteHandler = async (id) => {
    confirm({ description: `This will permanently delete .` })
    const deleteddata = data.find((curData) => curData.id === id);
    try {
      // confirm("Are you sure you want to delete Menu")
      const result = await axios.put(
        `http://localhost:5000/admin/allmenu/delete/${deleteddata.id}`
      );
      console.log(result);
      return result.data;
    } catch (error) {
      console.log(error);
    }
    // setdata(deleteddata);
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

  const updatedItemHandler = async (e) => {
    e.preventDefault();
    debugger;
    if (!title) {
      toast.error("Plz Fill the all the field");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("parent_Menu", parent_Menu);
      const result = await axios.put(
        `http://localhost:5000/admin/allmenu/${updateState}`,
        { title: title, parent_Menu: parent_Menu }
      );
      console.log(updateState);
      toast.success("Menu sucessfully Updated");
      closeUpdateModalHandler();
      return result.data;
    } catch (error) {
      toast.error(error);
      console.log("error: " + error);
    }
  };

  const editHandler = (id) => {
    setupdate(true);
    setupdatedItemModal(true);
    const updatedDetails = data.find((curData) => curData.id === id);

    console.log("updatedDetails===-==-=-=-->", updatedDetails);
    setTitle(updatedDetails.title);
    setparent_Menu(updatedDetails.parent_Menu);
    setupdateState(updatedDetails.id);
  };

  return (
    <>
      <ToastContainer />

      {/* ========UPDATE START */}
      {update && (
        <Modal
          open={updatedItemModal}
          onClose={openUpdateModalHandler}
          // setupdatedItemModal(false);
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={UpdateMenuModelStyle}>
            <div>
              <h1
                // style={{ textAlign: "right", cursor: "pointer", color: "white", backgroundColor:"red" }}
                style={{
                  marginLeft: "26rem",
                  cursor: "pointer",
                  color: "white",
                  backgroundColor: "red",
                  borderRadius: "3rem",
                  padding: "5px",
                }}
                onClick={closeUpdateModalHandler}
              >
                X
              </h1>
              {/* <h1 style={{ textAlign: "center" }}>Update-Pages</h1> */}
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <h1 style={{ textAlign: "center" }}>Update Menu</h1>
                <form onSubmit={updatedItemHandler} marginTop="4rem">
                  <Box style={{ marginTop: "20px", margin: "3rem" }}>
                    <TextField
                      fullWidth
                      label="Title"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      autoFocus
                    />
                    <FormControl sx={{ mt: 2, minWidth: 352 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Select ParentMenu
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={parent_Menu}
                        label="SelectMenu"
                        onChange={(e) => {
                          setparent_Menu(e.target.value);
                        }}
                      >
                        <MenuItem value="0">
                          <em>None</em>
                        </MenuItem>
                        {data.map((item) =>
                          item.parent_Menu === 0 ? (
                            <MenuItem value={item.id} key={item.id}>
                              {item.title}
                              {/* //  {item.parent_Menu==0 ? item.title  } */}
                              {/* // {console.log(item)} */}
                            </MenuItem>
                          ) : (
                            ""
                          )
                        )}
                      </Select>
                    </FormControl>
                    {/* {!title && <p>Plz fill the Title</p> } */}

                    {/* {!description && <p>Plz fill the description</p> } */}

                    {/* </div> */}
                    <div>
                      <div>
                        <Button
                          type="submit"
                          style={{
                            backgroundColor: "blue",
                            color: "white",
                            marginTop: "20px",
                            marginLeft: "4rem",
                          }}
                        >
                          Update-Menu
                        </Button>
                      </div>
                    </div>
                  </Box>
                </form>
              </Typography>
            </div>
          </Box>
        </Modal>
      )}

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
        <StyledModal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={open}
          BackdropComponent={Backdrop}
        >
          <Box
            style={{ marginLeft: "28rem" }}
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={modelstyle}
          >
            <div style={{ marginTop: "-3rem" }}>
              <h1
                // style={{ marginLeft: "25rem", cursor: "pointer", color: "white", backgroundColor: "red", borderRadius: "3rem", padding: "3px"}}
                style={{
                  marginLeft: "25rem",
                  cursor: "pointer",
                  color: "white",
                  backgroundColor: "red",
                  borderRadius: "3rem",
                  padding: "3px",
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                X
              </h1>
              <h1 style={{ marginLeft: "7rem" }}>Add a new menu</h1>
            </div>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <br />

            {/* </div> */}

            <>
              <FormControl sx={{ mt: 2, minWidth: 427 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Select ParentMenu
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={parent_Menu}
                  label="SelectMenu"
                  onChange={(e) => {
                    setparent_Menu(e.target.value);
                  }}
                >
                  <MenuItem value="0">
                    <em>None</em>
                  </MenuItem>
                  {data.map((item) =>
                    item.parent_Menu === 0 ? (
                      <MenuItem value={item.id} key={item.id}>
                        {item.title}
                        {/* //  {item.parent_Menu==0 ? item.title  } */}
                        {/* // {console.log(item)} */}
                      </MenuItem>
                    ) : (
                      ""
                    )
                  )}
                </Select>
              </FormControl>
            </>
            <div>
              <div>

                <Button
                  type="submit"
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    marginTop: "20px",
                    marginLeft: "20rem",
                  }}
                >
                  Add User
                </Button>
              </div>
            </div>
          </Box>
        </StyledModal>
      </div>

      <div>
        <TableContainer component={Paper} style={style}>
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
                  {/* <StyledTableCell align="center">
                    {data.find((all) => all.id === item.parent_Menu)?.title ||
                      "-"}
                  </StyledTableCell> */}
                  {/* <EditIcon style={{ color: "blue", marginRight: "px" }} />
                  <DeleteIcon style={{ color: "red" }} /> */}
                  <EditIcon
                    style={{
                      color: "blue",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => editHandler(item.id)}
                  />

                  <DeleteIcon
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => deleteHandler(item.id)}
                  />

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
