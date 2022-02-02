import {useState} from "react";

let tempLogin : string[] = []
let tempLoginMisc : string[] = []
let tempQuitMisc : string[] = []
let tempEvents : string[] = []
let tempTeam : string[] = []
let tempQuizzes : string[] = []

export function useDivider() {
    const [loading, setLoading] = useState(false)
    const [quizzes, setQuizzes] = useState<string[]>([])
    const [team, setTeam] = useState<string[]>([])
    const [loginMisc, setLoginMisc] = useState<string[]>([])
    const [login, setLogin] = useState<string[]>([])
    const [quitMisc, setQuitMisc] = useState<string[]>([])
    const [events, setEvents] = useState<string[]>([])

    function execute(input : string) {
        setLoading(true)
        resetArrays()
        const lines = input.split("\n")
        console.log("Parsing "+lines.length+" lines")
        lines.forEach(assignLine)

        setQuizzes(tempQuizzes)
        setTeam(tempTeam)
        setEvents(tempEvents)
        setLoginMisc(tempLoginMisc)
        setLogin(tempLogin)
        setQuitMisc(tempQuitMisc)
        setLoading(false)
    }

    function allActivities() : string[] {
        return [...quizzes, ...events]
    }

    function getPlaytime() {
        return {
            start: getFirstLoginPlayTime(loginMisc),
            end: getLastLogoutPlayTime(quitMisc),
            calculated: getPlaytimeFromArray(loginMisc, quitMisc)
        }
    }

    function getNick() {
        return getNickFromArray(team)
    }

    function getAccount() : string {
        return getAccountFromArray(login)
    }

    return {execute, loading, quizzes, team, events, allActivities, getPlaytime, getNick, getAccount}
}

function assignLine(line:string) {
    if(line.includes(" LOGIN: ")) tempLogin.push(line)
    if(line.includes(" LOGIN MISC: ")) tempLoginMisc.push(line)
    if(line.includes(" QUIT MISC: ")) tempQuitMisc.push(line)
    if(line.includes("TC: [Civilian Workers]")) tempTeam.push(line)
    if(line.includes(" Hosted Civilian event; ")) tempEvents.push(line)
    if(line.includes(" created a quiz of '")) tempQuizzes.push(line)
}

function resetArrays() {
    tempLogin = []
    tempLoginMisc = []
    tempQuitMisc = []
    tempQuizzes = []
    tempEvents = []
    tempTeam = []
}

function getFirstLoginPlayTime(loginMisc:string[]) : number {
    let pattern = "PlayTime: ([0-9]+) "
    if(loginMisc.length === 0) return 0
    let first = loginMisc[0].match(pattern)
    if(first == null){
        console.log("Could not calculate playtime, regex is null")
        return -1
    }
    return Number.parseInt(first[0].replace("PlayTime:", "").replaceAll(" ", ""))
}

function getLastLogoutPlayTime(quitMisc:string[]) : number {
    let pattern = "PlayTime: ([0-9]+) "
    if(quitMisc.length === 0) return 0
    let last = quitMisc[quitMisc.length-1].match(pattern)
    if(last == null){
        console.log("Could not calculate playtime, regex is null")
        return -1
    }
    return Number.parseInt(last[0].replace("PlayTime:", "").replaceAll(" ", ""))
}

function getPlaytimeFromArray(loginMisc:string[], quitMisc:string[]) : number {
    try {
        return Math.round((getLastLogoutPlayTime(quitMisc) - getFirstLoginPlayTime(loginMisc))/60)
    } catch(e:any) {
        return -1
    }
}

function getAccountFromArray(login:string[]) : string {
    if(login.length === 0) return "NOT_FOUND"
    const output = login[0].match(" LOGIN: (.*) logged into by")
    if(output === null) return "NOT_FOUND"
    return output[0].replace(" LOGIN: ", "").replace(" logged into by", "")
}

function getNickFromArray(teamChat:string[]) : string {
    if(teamChat.length === 0) return "NOT_FOUND"
    const output = teamChat[0].match("TC: [Civilian Workers] (.*): ")
    if(output === null){
        console.log("Output for Nick is null")
        return "NOT_FOUND"
    }
    return output[0].replace("TC: [Civilian Workers]", "").replace(": ", "").replaceAll(" ", "")
}