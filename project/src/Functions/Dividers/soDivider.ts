import {useState} from "react";
import soReviewFormat from "../Formats/SoReviewFormat";
import {
    getAccountFromArray,
    getFirstLoginPlayTime,
    getLastLogoutPlayTime,
    getNickFromArray,
    getPlaytimeFromArray
} from "./getBasicLogInfo";

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

    function getFormat() : string {
        return soReviewFormat(getNick(), getAccount(), events.length, quizzes.length, team.length, getPlaytime())
    }

    return {execute, loading, quizzes, team, events, allActivities, getPlaytime, getNick, getAccount, getFormat}
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