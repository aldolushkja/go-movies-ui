import React, { Component } from "react";
import Ticket from "./../images/home-logo.jpg";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="text-center">
        <h2>Welcome to Home</h2>
        <hr />
        <img src={Ticket} alt="movie ticket" />
        {/* <div className="tickets"></div> */}
      </div>
    );
  }
}
