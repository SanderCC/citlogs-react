export function getFirstLoginPlayTime(loginMisc:string[]) : number {
    let pattern = "PlayTime: ([0-9]+) "
    if(loginMisc.length === 0) return 0
    let first = loginMisc[0].match(pattern)
    if(first == null){
        console.log("Could not calculate playtime, regex is null")
        return -1
    }
    return Number.parseInt(first[0].replace("PlayTime:", "").replaceAll(" ", ""))
}

export function getLastLogoutPlayTime(quitMisc:string[]) : number {
    let pattern = "PlayTime: ([0-9]+) "
    if(quitMisc.length === 0) return 0
    let last = quitMisc[quitMisc.length-1].match(pattern)
    if(last == null){
        console.log("Could not calculate playtime, regex is null")
        return -1
    }
    return Number.parseInt(last[0].replace("PlayTime:", "").replaceAll(" ", ""))
}

export function getPlaytimeFromArray(loginMisc:string[], quitMisc:string[]) : number {
    try {
        return Math.round((getLastLogoutPlayTime(quitMisc) - getFirstLoginPlayTime(loginMisc))/60)
    } catch(e:any) {
        return -1
    }
}

export function getAccountFromArray(logs:string[]) : string {
    if(logs.length === 0) return "NOT_FOUND"
    const output = logs[0].match(" LOGIN: (.*) logged into by")
    if(output === null) return "NOT_FOUND"
    return output[0].replace(" LOGIN: ", "").replace(" logged into by", "")
}

export function getNickFromArray(logs:string[]) : string {
    if(logs.length === 0) return "NOT_FOUND"
    const output = logs[0].match("logged into by (.*) ([A-Z0-9]+) ")
    if(output === null) return "NOT_FOUND"
    let nickAndSerial = output[0].replace("logged into by", "")
    return nickAndSerial.split(" ")[1]
}

export function getSerialFromArray(logs:string[]) : string {
    if(logs.length === 0) return "NOT_FOUND"
    const output = logs[0].match("logged into by (.*) ([A-Z0-9]+) ")
    if(output === null) return "NOT_FOUND"
    let nickAndSerial = output[0].replace("logged into by", "")
    return nickAndSerial.split(" ")[2]
}