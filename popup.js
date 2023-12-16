function getUrl(){
	chrome.tabs.query({"active":true,"currentWindow":true},(tabs)=>{
		if(tabs[0].url.includes("youtube.com/playlist?list")){
			//console.log(tabs[0].id)
			chrome.tabs.sendMessage(tabs[0].id,{
				yt:"yes"
			},(res)=>{
				if(res.status == "done"){
					chrome.storage.sync.get("field").then((res)=>{
						document.querySelector("h3").innerHTML = res.field
					})
				}
			})
			
			
			
			
		}else{
			//console.log("not on a youtube playlist")
			document.querySelector("h3").innerHTML = "you are not on a youtbe playlist"
		}
	})
}


getUrl();

