const fs = require("fs");
const ytdl = require("ytdl-core");

function ytDownload(e,data){
	let stream = fs.createWriteStream(data.filepath);
	ytdl(data.url,{quality:data.quality,filter:"audioandvideo"})
		.pipe(stream);
	//someone FIX ME- finish emits twice on eevent reply to ipcRenderer
	stream.on("finish",()=>{
		e.reply("download-confirmation","finished");
		stream.destroy();
	});
}
function ytAudioDownload(e,data){
	let stream = fs.createWriteStream(data.filepath);
	ytdl(data.url,{filter:"audioonly"})
		.pipe(stream);
	//someone FIX ME- finish emits twice on eevent reply to ipcRenderer
	stream.on("finish",()=>{
		e.reply("download-confirmation","finished");
		stream.destroy();
	});
}

function ytValidateURL(url){
	return ytdl.validateURL(url);
}

function ytGetInfo(url){
	let promise = ytdl.getBasicInfo(url,[]);
	const data= Promise.resolve(promise).then((info)=>info).catch(err=>err);
	return data;
}

module.exports={
	ytDownload,
	ytGetInfo,
	ytAudioDownload,
	ytValidateURL

}
