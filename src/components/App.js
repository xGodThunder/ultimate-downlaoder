import '../assets/css/App.css';
import React, { Component } from 'react';
import Sidebar from './sidebar';
import Main from './main';
let ipcRenderer = require('electron').ipcRenderer;


class App extends React.Component {


  render() {
    return (
      <div className="container">
        <Sidebar/>
        <Main/>
      </div>
    );
  }
}

export default App;
