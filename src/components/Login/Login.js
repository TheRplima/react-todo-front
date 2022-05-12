import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import "./LoginStyle.css";
import showPwd from "../../images/showPwd.png";
import hidePwd from "../../images/hidePwd.png";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Navigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F2AA4CFF",
    },
  },
});

export default class Login extends Component {
  state = {
    loginData: {
      email: "",
      password: "",
    },
    errMsgEmail: '',
    errMsgPassword: '',
    hidden: true,
    redirect: false,
    errMsg: '',
    accessToken: "",
    error: false
  };

  toggleShow = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  onChangeHandler = (e) => {
    const { loginData } = this.state;
    loginData[e.target.name] = e.target.value;
    this.setState({ loginData });
  }

  onSubmitHandler = () => {
    var formdata = new FormData();
    formdata.append("email", this.state.loginData.email);
    formdata.append("password", this.state.loginData.password);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };
    fetch(
      "https://young-earth-00064.herokuapp.com/api/user/login",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'success') {
          this.setState({ accessToken: result.token, isLoggedIn: true })
          sessionStorage.setItem('token', result.token)
          sessionStorage.setItem('userName', this.state.loginData.email)
          sessionStorage.setItem('isLoggedIn', true)
        }
        if (result.status === 'failed') {
          this.setState({
            errMsg: result.message
          })
        }
        if (result.status === "error") {
          this.setState({
            error: true,
            errMsgEmail: result.validation_errors.email[0],
            errMsgPassword: result.validation_errors.password[0]
          })
        }
        if (result.error === false) {
          this.setState({ redirect: true })
        }
      })
      .catch((error) => {
        console.log("errro", error);
      });
  }

  render() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (this.state.redirect) {
      return <Navigate to="/todo" />;
    }
    if (isLoggedIn) {
      return <Navigate to="/todo" />;
    }
    return (
      <Container className="themed-container mt-2" fluid="md">
        <ThemeProvider theme={theme}>
          <div className="wrapper">
            <div className="text-center">
              <i className="fa fa-user-circle-o" aria-hidden="true"></i>
              <div className="text-color">Signin</div>
              <div className="hr"></div>
            </div>
            <div className="signin-wrapper">
              <TextField
                error={this.state.error}
                helperText={this.state.loginData.email === '' ? this.state.error : this.state.errMsgEmail}
                label="Email"
                type="text"
                name="email"
                fullWidth
                variant="outlined"
                value={this.state.loginData.email}
                onChange={this.onChangeHandler}
              />
              <div className="show-hide-pwd-wrapper">
                <TextField
                  error={this.state.error}
                  helperText={this.state.loginData.password === '' ? this.state.error : this.state.errMsgPassword}
                  label="Password"
                  name="password"
                  type={this.state.hidden ? "password" : "text"}
                  fullWidth
                  variant="outlined"
                  value={this.state.loginData.password}
                  onChange={this.onChangeHandler}
                />

                <img
                  src={this.state.hidden ? showPwd : hidePwd}
                  onClick={this.toggleShow}
                  alt="showPwd"
                  className="eyeIcon"
                />
              </div>
              <p className="errMsgStyl">{this.state.errMsg}</p>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={this.onSubmitHandler}
                disabled={!this.state.loginData.email || !this.state.loginData.password}
              >
                SIGN IN
              </Button>
              <p to="/sign-up" className="dont-have-txt">
                Don't have an Account to Signin? <Link to="/registration" className="signup-txt">SignUp</Link>
              </p>
            </div>
          </div>
        </ThemeProvider>
      </Container>
    );
  }
}