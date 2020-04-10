'use strict'
import '../assets/css/App.css';
import React, { Component } from 'react';
import youtube from './../assets/images/youtube.png';
import facebook from './../assets/images/facebook.png';
let ipcRenderer = require('electron').ipcRenderer;
export default ()=>{
/*
to build selector for multiple video downloading source options.
*/
    return (
     
        <div className="sidebar">
            <h3>Select downloader</h3>
              <div className="sidebar_active">
              <img src={youtube}></img>
              <p>Youtube</p>
              </div>
              <div>
              <img src={facebook}></img>
                <p>coming soon</p>
              </div>
        </div>
    );

};
