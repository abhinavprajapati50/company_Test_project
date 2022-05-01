import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { LoginAction } from "../../src/New_Redux/Actions/LoginAction"
import { useSelector, useDispatch } from "react-redux";

// Project / Task - Management / frontend / taskmanager - main / src / New_Redux / Actions / LoginAction";
// import { LoginAction } from "../../../../../../Project/Task-Management/frontend/taskmanager-main/src/New_Redux/Actions/LoginAction";

const emailValidator =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2}))$/;

// /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const passwordValidator =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [validEmail, setvalidEmail] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeHanlder = (e) => {
    setEmail(e.target.value);

    // validator();
  };

  const validation = (email) => {
    if (emailValidator.test(email)) {
      return setvalidEmail(true);
    } else {
      return setvalidEmail(false);
    }
  };

  console.log(emailValidator.test(email));
  // console.log("false email", email.toLowerCase().match(emailValidator));
  // console.log(
  //   "false password",
  //   password.toLowerCase().match(passwordValidator)
  // );

  const onChangeHanlder1 = (e) => {
    setPassword(e.target.value);

    // if (password.toLowerCase().match(passwordValidator)) {
    //   setPassError(false);
    // } else {
    //   setPassError(true);
    // }
    // validator();
  };

  // const loggedINHandler = async (event) => {
  //   event.preventDefault();
  //   debugger
  //   try {
  //     const result = await axios.post('https://reqres.in/api/login', {
  //       email, password
  //     });
  //     // const result = await axios.post("http://localhost:5000/signin", {
  //     //   email: email,
  //     //   password: password,
  //     // });
  //     console.log(result.data.token);
  //     // toast.success(result.data.message);

  //     console.log("the result", result);
  //     localStorage.setItem('token' , result.data.token);
  //     // setEmailError(false);
  //     setIsLoggedIn(true);
  //     navigate("admin", { return: true });
  //   } catch (error) {
  //     // setEmailError(true);
  //     console.log(error.message);
  //     return toast.error("Invalid Credentials");

  //     // console.log(error);
  //   }
  // };

  const loggedINHandler = async (event) => {
    event.preventDefault();
    debugger
    setEmailError(true);
    setPassError(true);

    // validation();
    const loginCredentials = {
      email,
      password
    };
    const loggedInData = await dispatch(LoginAction(loginCredentials));

    console.log(loggedInData);
    // setloginData(loggedInData)

    if (loggedInData.isLoggedIn == false) {
      toast.error(loggedInData.payload);
      return;
    }
    // setisLoggedIN(true);

    console.log("--------------loggedInData.payload", loggedInData.payload);
    // clearData();
    // navigate("/admin");
    toast.success(`Welcome ${loggedInData.payload.username} `);
    // toast.success(result.data.message);
    navigate("/admin", { return: true });
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",

            }}
            onSubmit={loggedINHandler}
            noValidate
            component="form"
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {/* <Box
              autoComplete="off"
              onSubmit={loggedINHandler}
              sx={{ mt: 1 }}
            > */}
            <TextField
              autoComplete="off"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={onChangeHanlder}
            // onChange={(e) => setEmail(e.target.value)}
            />
            {/* {!emailValidator.test(email) ? <p> {error}</p> : ""} */}
            {emailError && !email && <p style={{ color: "red" }}>invalid Email</p>}
            {validEmail ? <span> Plz fill Valid Message</span> : ""}

            <TextField
              autoComplete="off"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={onChangeHanlder1}
            />

            {/* {passError && <p style={{ color: "red" }}>Invalid Password</p>} */}
            {
              passError && !password && (
                <p style={{ color: "red" }}>plz fill the password</p>
              )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
            {/* </Box> */}
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};
