import "../assets/css/App.css";
import logo from "../assets/images/logo.png";
import loading_spinner from "../assets/images/loading.gif";
import React, { useState } from "react";
import notification from "./notification";
import Author from "./Author";
let classNames = require("classnames");
let ipcRenderer = require("electron").ipcRenderer;

const {remote} = require("electron"),
	dialog = remote.dialog,
	WIN = remote.getCurrentWindow();

let options = {

	title: "Save file from ultimate-downloader",

	defaultPath : "",

	buttonLabel : "Save Video File",

};
export default ()=>{
	const [info, setInfo] = useState(null);
	const [loading,setLoading]=useState(false);


	function checkUrl(e){
		e.preventDefault();
		if(loading){
			notification({icon:"error",title:"Download is under process",text:"please wait a while before starting another download"});
			return false;
		}
		const url =e.target.elements[0].value;
		ipcRenderer.sendSync("url-received",{url:url});
	}

	function startDownload(e){
		e.preventDefault();
		if(loading){
			notification({icon:"error",title:"Download is under process",text:"please wait a while before starting another download"});
			return;
		}
		const quality =e.target.children[0].children[1].value;
		// setting filetypes filter fr save window path selector
		if(quality==="audioonly"){
			options.filters=[
				{name: "Audio", extensions: ["mp3","wav"]},
			];
		}else{
			options.filters=[
				{name: "Movies", extensions: ["mp4","flv"]},
			];
		}
		options.defaultPath=`c:\\${info.title}`;
		let filename = dialog.showSaveDialog(WIN, options);
		filename.then(data=>{
			ipcRenderer.sendSync("start-download",{quality:quality,filepath:data.filePath,url:info.video_url});
			if(data.filePath){
				setLoading(true);
			}
		}).catch(err=>{
			notification({icon:"error",title:"Internal error",text:"please email the task you are doing to ishubot@gmail.com"});
		});
	}

	ipcRenderer.on("set-url-info", (event, arg) => {  
		setInfo(arg);
	});

	ipcRenderer.on("download-confirmation", (event, arg) => {
		setLoading(false);
		notification({icon:"success",title:"Download Successfull !",text:"That is Awesome Champion"});
	});
	ipcRenderer.on("call-notification", (event, arg) => {
		notification({icon:"error",title:arg,text:"Please check url, dont forget to metion http/https before the url"});
	});


	return (
		<div className="main">
			<h1><img src={logo} alt="Logo" style={{width:"50px"}}/> Ultimate  Video Downloader</h1>
			<form className="form" onSubmit={checkUrl}>
				<div className="input-group">
					<span className="input-group-addon">Enter URL:</span>
					<input className="form-input" placeholder="Enter Video URL" type="text"></input> 
					<button className={classNames({"btn":true,"btn-primary":true,"input-group-btn":true})} type="submit">get video</button>
				</div>
			</form>

			{info && <div className="info">
				<div className={classNames({"video-responsive":true,"video-responsive-4-3":true})}>
					<iframe width="350" height="250" frameBorder="0"
						src={`https://www.youtube.com/embed/${info.video_id}`}>
					</iframe>
				</div>
				<div>
					<h2 className="text-primary">{info.title}</h2>
					<form onSubmit={startDownload}>
						<div className="input-group">
							<span className="input-group-addon">Quality</span>
							<select className="form-select">
								<option value="highestvideo">Highest</option>
								<option value="highest">Medium</option>
								<option value="audioonly">MP3</option>
							</select>
							<button className={classNames({"btn":true,"btn-success":true,"input-group-btn":true})} type="submit">download</button>
						</div>
					</form>
				</div>
			</div>}
			<div className={classNames({
				"info-panel":true,
				"info-panel-active": loading ? true : true

			})}>
				{loading && <h1><img src={loading_spinner}/><span style={{"verticalAlign":"top"}}>Downloading...</span></h1>}
			</div>
			<Author/>
		</div>
	);

};
