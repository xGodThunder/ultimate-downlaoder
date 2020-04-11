import '../assets/css/App.css';
import logo from '../assets/images/logo.png';
import loading_spinner from '../assets/images/loading.gif';
import success_spinner from '../assets/images/success.gif';
import React, { useState } from 'react';
let classNames = require('classnames');
let ipcRenderer = require('electron').ipcRenderer;
//renderer.js - renderer process example
const {remote} = require('electron'),
dialog = remote.dialog,
WIN = remote.getCurrentWindow();

let options = {
    //Placeholder 1
    title: "Save file from ultimate-downloader",
    
    //Placeholder 2
    defaultPath : "",
    
    //Placeholder 4
    buttonLabel : "Save Video File",
    
    //Placeholder 3
  
   }
export default ()=>{
    const [info, setInfo] = useState(null);
    const [loading,setLoading]=useState(false);
    const [success,setSuccess]=useState(false);

    function checkUrl(e){
        e.preventDefault();
        const url =e.target.elements[0].value;
        ipcRenderer.sendSync("url-received",{url:url});
    }

    function startDownload(e){
        e.preventDefault();
        const quality =e.target.children[1].value;
        if(quality==='audioonly'){
            options.filters=[
                {name: 'Audio', extensions: ['mp3','wav']},
               ]
        }else{
            options.filters=[
                {name: 'Movies', extensions: ['mp4','flv']},
               ]
        }
        options.defaultPath=`c:\\${info.title}`;
        let filename = dialog.showSaveDialog(WIN, options);
       filename.then(data=>{
        ipcRenderer.sendSync("start-download",{quality:quality,filepath:data.filePath,url:info.video_url});
        if(data.filePath){
            setLoading(true);
        }
       }).catch(err=>{
           console.log(err);
       })
      
 
    }



     ipcRenderer.on('set-url-info', (event, arg) => {
        
       setInfo(arg);
     });
  
     ipcRenderer.on('download-confirmation', (event, arg) => {
         setLoading(false);
         setSuccess(true);
         setTimeout(()=>{
             setSuccess(false);
         },5000);
        
     
    });

    

    return (
        <div className="main">
            <h1><img src={logo} alt="Logo" style={{width:'50px'}}/> Ultimate  Video Downloader</h1>
              <form className="form" onSubmit={checkUrl}>
                    <div><span>Enter URL: </span><input  placeholder="Enter Video URL" type="text"></input>  <button type="submit">Submit</button></div>
                  
              </form>

              {info && <div className="info">
                  <div>
                    <iframe width="350" height="250"
                    src={`https://www.youtube.com/embed/${info.video_id}`}>
                    </iframe>
                  </div>
                  <div>
                      <h2>{info.title}</h2>
                      <form onSubmit={startDownload}>
                      <button type="submit">download</button>
                      <select>
                        <option value="highestvideo">Highest</option>
                        <option value="highest">Medium</option>
                        <option value="audioonly">MP3</option>
                      </select>
                      </form>
                  </div>
              </div>}
              <div className={classNames({
                  "info-panel":true,
                  "info-panel-active": loading || success ? true : false

              })}>   
                    {loading && <div><img src={loading_spinner}/><span>Downloading...</span></div>}
                    {success && <div><img src={success_spinner}/><span>Download Successfull</span></div>}
              </div>
              
        </div>
    );

};
