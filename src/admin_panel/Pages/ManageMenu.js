import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
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



export const ManageMenu = ({ setadminPanel }) => {
  const [data, setdata] = useState([]);

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
  return (
    <>
      <div>
        <NavLink to="/adduser">

          <Button
            type="button"
            style={{ marginLeft: "58%", backgroundColor: "blue", color: "white" }}
          >
            Add User
          </Button>
        </NavLink>

      </div>

      <div>
        {data.length > 0 && <TableContainer component={Paper} style={style}>
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
