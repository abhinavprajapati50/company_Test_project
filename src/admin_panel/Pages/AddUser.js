import { Box, Button, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";


import { userActions, userUpdateSuccess } from '../../New_Redux/Actions/userAcions';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

const style = {
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 940,
    height: 300,
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



export const AddUser = (event) => {
    const [isUpdated, setisUpdated] = useState(false)

    const [update, setUpdate] = useState()
    // console.log(isUpdated ? JSON.stringify( update.name) : '');
    const [name, setName] = useState(isUpdated ? JSON.stringify(update.name) : '')
    const [job, setJob] = useState(isUpdated ? update.job : '')
    const [data, setData] = useState([])
    const { id } = useParams()


    const dispatch = useDispatch();

    const clearData = () => {
        setName("")
        setJob("")
    }

    console.log("-----updateupdate------>>>", isUpdated);

    const adduserHandler = async (event) => {
        event.preventDefault();
        if (!name || !job) {
            return alert("Please Fill all details")
        }
        const loginCredentials = {
            name,
            job
        };
        // const updateCredentials = {
        //     name, job, id: update.id
        // }

        console.log("------updateupdate--------", isUpdated);

        if (isUpdated) {
            setisUpdated(true)
            const upadtedData = await dispatch(userUpdateSuccess({ name, job, id: update?.id }))
            console.log(upadtedData);
            const updatedData = upadtedData.payload
            console.log("--------updatedData", updatedData);
            // setData(data.map(cur => {
            //     return console.log(cur);
            //     // if (cur.id === update?.id) {
            //     //       return  console.log("*********",cur);
            //     // }
            // }
            // ))
            console.log(data);
            const updatedItem = data.map(cur => {
                //    return cur.id == update.id ? {...cur, name:name, job:job} : ""
                if (cur.id == update.id) {
                    console.log({ ...cur, name, job });
                    return { ...cur, name, job }
                }
                return cur;
            })
            console.log(updatedItem);
            setData(updatedItem);
            setisUpdated(false)
            clearData()

        } else {
            setisUpdated(false)
            const addData = await dispatch(userActions(loginCredentials));
            console.log("---------addData", addData);
            let add = addData.payload
            setData(prev => [...prev, add]);

            clearData()
        }

        // const updateData = await dispatch(userUpdateSuccess(updateCredentials));
        // console.log(updateData);


    }

    const editHandler = (id) => {
        setisUpdated(true)
        const updatedDetails = data.find((curData) => curData.id === id);
        console.log(updatedDetails);
        setUpdate(updatedDetails)
        setName(updatedDetails.name)
        setJob(updatedDetails.job)

    };

    const deleteHandler = async (id) => {
        const deleteddata = data.filter((curData) => curData.id !== id);
        console.log(deleteddata);

        setData(deleteddata)

    };

    console.log(data);
    return (
        <div> {isUpdated ? <div> Add ddUser</div> : <div>  Update User </div>}
                { console.log("---------------------------------------------",isUpdated) }
            <Box
                sx={{
                    // margin: 108,
                }}
                onSubmit={adduserHandler}
                style={{ width: "20%", marginLeft: '34rem' }}
                noValidate
                component="form"

            >
                <Typography component="h1" variant="h5">
                {isUpdated ?  <div>  Update User </div> : <div> Add User</div> }
                </Typography>

                <TextField
                    autoComplete="off"
                    margin="normal"
                    fullWidth
                    id="name"
                    label="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    autoComplete="off"
                    margin="normal"
                    required
                    fullWidth
                    name=" job"
                    label="job"
                    type=" job"
                    id="job"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Add
                </Button>

            </Box>

            {data.length > 0 ? <div>
                <TableContainer component={Paper} style={style}>
                    <Table sx={{ minWidth: 900 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Job</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item) => (
                                <StyledTableRow key={item.id}>
                                    {console.log(item)}
                                    <StyledTableCell align="center">{item.name}</StyledTableCell>
                                    <StyledTableCell align="center">{item.job}</StyledTableCell>
                                    <StyledTableCell align="center">
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
                                    </StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
                : <h1 style={{ marginLeft: '34rem', marginTop: '10rem', color: "#833932" }}>No user found !!</h1>
            }


        </div>
    )
}
