import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { password: "", email: "", isRemember: false, isAlert: true };

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeRemember = this.handleChangeRemember.bind(this);
  }

  LoginButton = () => {
      this.setState({isAlert: true})
    // console.log("UTKU")
  };

  handleChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
    console.log(this.state.password);
  }
  handleChangeRemember(event) {
    this.setState({
      isRemember: !this.state.isRemember,
    });
    console.log(this.state.isRemember);
    
}

  handleChangeEmail(event) {
    this.setState({
      email: event.target.value,
    });
    console.log(this.state.email);
  }

  closeAlert = () => {
      this.setState({
          isAlert: false,
      })
  }

  render() {
    return (
        
      <form>
        <h3>Sign In</h3>

        {this.state.isAlert ? 
        <div className="alert alert-success alert-dismissible fade show">
          <strong>Success!</strong> Your message has been sent successfully.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            onClick={this.closeAlert}
          ></button>
        </div>
        : null}
        
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={this.handleChangeEmail}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={this.handleChangePassword}
          />
        </div>
        

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
              onChange={this.handleChangeRemember}
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={this.LoginButton}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}
