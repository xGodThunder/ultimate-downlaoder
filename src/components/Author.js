import React, { useState } from 'react';
import Author from './../assets/images/author.png';
import youtube from './../assets/images/yt.png';
import github from './../assets/images/github.png';
import linkedin from './../assets/images/linkedin.png';
import insta from './../assets/images/instagram.png';
import { link } from 'fs';
let classNames = require('classnames');
let shell =  require('electron').shell;

export default ()=>{

    const [display,setDisplay]=useState(false);

    

    return(
        <div className={classNames({"popover":true,"author":true})}>
            <div className="chip">
                   
                    <img src={Author} className="avatar avatar-sm"/>
                    Ishu Sharma
            </div>
            <div className="popover-container">
            <div className="card">
                <div className="card-header">
                <img src={Author} className="avatar avatar-lg"/>
                <div className="card-title h5">Ishu Sharma</div>
                <div className="card-subtitle text-gray">Feed on science</div>
                </div>
                <div className="card-body">
                    <p>Follow me on:</p>
                    <ul className="author-social">
                      <li><img src={youtube} onClick={()=>shell.openExternal('https://www.youtube.com/watch?v=gR6-Oo_DC1Q')}/></li>
                      <li><img src={linkedin} onClick={()=>shell.openExternal('https://www.linkedin.com/in/ishusupah/')}/></li>
                      <li><img src={github} onClick={()=>shell.openExternal('https://github.com/xGodThunder/ultimate-downlaoder')}/></li>
                      <li><img src={insta} onClick={()=>shell.openExternal('https://www.instagram.com/i_am_mr.infinity/')}/></li>
                    </ul>
                </div>
                <div className="card-footer">
                    Any idea, suggestion or bug?
                    please email me on:
                    <a href="mailto:ishubot@gmail.com">ishubot@gmail.com</a>
                </div>
            </div> 
        </div>
        </div>
    );
}