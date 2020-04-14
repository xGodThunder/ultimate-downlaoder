import "../assets/css/ui.css";
import "../assets/css/App.css";
import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
let ipcRenderer = require("electron").ipcRenderer;


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
