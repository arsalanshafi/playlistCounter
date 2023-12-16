

const calculate = () =>{
    hour = Math.trunc(min/60)
    min = min%60
    min += Math.trunc(sec/60)
    sec = sec%60

    if(hour || min || sec){
        //return (`it will take you ${hour} hours ${min} minutes and ${sec} seconds`)
		chrome.storage.sync.set({field:`it will take you ${hour} hours ${min} minutes and ${sec} seconds`})
		return true
    }

    // console.log(`it will take you ${hour} hours ${min} minutes and ${sec} seconds`)
}


const getMinutes = (arr)=>{
    const minutes = []
    arr.forEach(e =>{
        minutes.push(Math.trunc(e))
    })
    // console.log(minutes)
    min = minutes.reduce((acc,a)=>acc + a,0)
}

const getSeconds = (arr)=>{
    const seconds = []
    arr.forEach(e =>{
        seconds.push(parseInt((e-Math.trunc(e))*100))
    })
    sec = seconds.reduce((acc,e)=>acc+e,0)
}

const getTags = () =>{
    const tags = Array.from(document.querySelectorAll("span#text"))
    const times = []
    if(tags[0]){
        tags.forEach(e=>{
            times.push(parseFloat(e.innerHTML.trim().replace(":",".")))
        })
    }
    if(times[0]){
        getMinutes(times)
        getSeconds(times)
    }
}


chrome.runtime.onMessage.addListener((obj,sender,response)=>{
    if(obj.yt == "yes"){
		let min,sec,hour
        console.log("message recieved")
        getTags()
        let flag = calculate()
		console.log(flag)
    }
	if(flag){
		response({status:"done"})
	}
	
	
})



