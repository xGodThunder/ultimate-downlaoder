const fs = require('fs');
const ytdl = require('ytdl-core');

function ytDownload(data){
    ytdl(data.url,{quality:data.quality,filter:'audioandvideo'})
    .pipe(fs.createWriteStream(data.filepath));

}
function ytAudioDownload(data){

    ytdl(data.url,{filter:'audioonly'})
    .pipe(fs.createWriteStream(data.filepath));

}

async function ytGetInfo(url){
  
   let promise =  ytdl.getBasicInfo(url,[]);
   const data= Promise.resolve(promise).then((info)=>info).catch(err=>err);
   return data;
}
module.exports={
    ytDownload:ytDownload,
    ytGetInfo:ytGetInfo,
    ytAudioDownload:ytAudioDownload

}
