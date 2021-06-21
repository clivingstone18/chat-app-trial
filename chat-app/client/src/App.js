import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
// ES6 import or TypeScript
import { io } from "socket.io-client";
import {Chat} from "./components/Chat"
import {Join} from "./components/Join"
import { BrowserRouter as Router, Route } from "react-router-dom";

// CommonJS
const ENDPOINT = "http://localhost:5000";

function App() {
  return(
  <Router>
  <Route path="/" exact component={Join} />
  <Route path="/chat" component={Chat} />
</Router>
  )
}

export default App;
