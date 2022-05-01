import { Box, Button, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'

import { userActions } from '../../New_Redux/Actions/userAcions';
import {  useDispatch } from "react-redux";


export const AddUser = (event) => {
    const [name, setname] = useState('')
    const [job, setjob] = useState('')
    const dispatch = useDispatch();

    const clearData = () => {
        setname("")
        setjob("")
    }

    const adduserHandler = async (event) => {
        event.preventDefault();
        debugger
        const loginCredentials = {
            name,
            job
        };
        const loggedInData = await dispatch(userActions(loginCredentials));

        console.log(loggedInData);
         clearData()

        // console.log(loggedInData);
        // setloginData(loggedInData)

        // setisLoggedIN(true);

        // clearData();
        // navigate("/admin");
        // toast.success(`Welcome ${loggedInData.payload.username} `);
        // toast.success(result.data.message);
        // navigate("/admin", { return: true });
    }



    return (
        <div>AddUser

            <Box
                sx={{
                    margin: 108,
                    display: "flex",
                    flexDirection: "column",

                }}
                onSubmit={adduserHandler}
                style={{ width: "20%", marginLeft: '44rem' }}
                noValidate
                component="form"

            >
                <Typography component="h1" variant="h5">
                    Add User
                </Typography>
                {/* <Box
                    autoComplete="off"
                    component="form"
                    //   onSubmit={loggedINHandler}
                    noValidate
                    sx={{ mt: 1 }}
                    onSubmit={adduserHandler}

                > */}
                <TextField
                    autoComplete="off"
                    margin="normal"
                    fullWidth
                    id="name"
                    label="name"
                    name="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
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
                    onChange={(e) => setjob(e.target.value)}
                />


                {/* {!emailValidator.test(email) ? <p> {error}</p> : ""} */}
                {/* {!email && <p style={{ color: "red" }}>invalid Email</p>} */}
                {/* {validEmail ? <span> Plz fill Valid Message</span> : ""} */}

                {/* <TextField
                        autoComplete="off"
                        margin="normal"
                        required
                        fullWidth
                        name=" job"
                        label="job"
                        type=" job"
                        id="job"
                        value={job}
                        onChange={(e) => setyear(e.target.value)}
                    />
                    <TextField
                        autoComplete="off"
                        margin="normal"
                        required
                        fullWidth
                        name=" color"
                        label="color"
                        type=" color"
                        id="color"
                        value={color}
                        onChange={(e) => setcolor(e.target.value)}
                    /> */}
                {/* <TextField
                        autoComplete="off"
                        margin="normal"
                        required
                        fullWidth
                        name=" pantone_value"
                        label="pantone_value"
                        type=" pantone_value"
                        id="pantone_value"
                        value={pantone_value}
                        onChange={(e) => setpantone_value(e.target.value)}
                    /> */}
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DatePicker
                                disableFuture
                                label="Responsive"
                                openTo="job"
                                views={['day', 'month','job']}
                                // views={['job', 'month', 'day']}
                                value={pantone_value}
                                onChange={(newValue) => {
                                    setpantone_value(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider> */}

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Add
                </Button>

                {/* </Box> */}
            </Box>

        </div>
    )
}
