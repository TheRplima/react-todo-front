import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Header from "./components/Header/Header";
import InputItem from "./components/InputItem/InputItem";

export default class App extends Component {
  render() {
    return (
      <Router basename="/react-todo-front">
        <Header basename="/react-todo-front" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/todo" element={<InputItem />} />
        </Routes>
      </Router>
    );
  }
}
