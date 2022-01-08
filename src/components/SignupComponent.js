import React, { Component } from "react";
import Profile from "./ProfileComponent";
// import { Route } from "react-router";
import { Redirect } from "react-router";

function RoutetoProfile(props) {
  return <Redirect to={{ pathname: "/"+props.lang+"/Profile/"}} />;

  //   if (props.orderRequestResult && props.order == null) {
  //        return <Redirect to={{ pathname: "/"+props.lang+"/OrderPageLogin/" + props.robotId, state: { wrongCode: true } }} />
  //    }
  //    else if (props.orderRequestResult && props.order.robotId && props.robotId != props.order.robotId) {
  //        return <Redirect to={{ pathname: "/"+props.lang+"/OrderPageLogin/" + props.robotId, state: { wrongRobot: true } }} />
  //    }
  //   return null;
}

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      isRemember: false,
      isAlert: false,
      firstname: "",
      lastname: "",
    };

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
  }

  SignUpButton = () => {
    this.setState({ isAlert: true });
    // console.log("UTKU")
  };

  handleChangeFirstName(event) {
    this.setState({
      firstname: event.target.value,
    });
    console.log(this.state.firstname);
  }

  handleChangeLastName(event) {
    this.setState({
      lastname: event.target.value,
    });
    console.log(this.state.lastname);
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
    console.log(this.state.password);
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
    });
  };
  render() {
      if(this.state.isAlert){
         return( <RoutetoProfile/>);
      }
    return (
        
      <form>
        
        <h3>Sign Up</h3>

        {this.state.isAlert ? (
          <div className="alert alert-success alert-dismissible fade show">
            <strong>Success!</strong> Your message has been sent successfully.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              onClick={this.closeAlert}
            ></button>
          </div>
        ) : null}

        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={this.handleChangeFirstName}
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={this.handleChangeLastName}
          />
        </div>

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
        <div style={{ marginTop: 10 }}>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={this.SignUpButton}
          >
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}
