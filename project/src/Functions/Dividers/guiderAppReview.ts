import {useState} from "react";
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
let tempCountry : string[] = []

export function useDivider() {
    const [loading, setLoading] = useState(false)
    const [loginMisc, setLoginMisc] = useState<string[]>([])
    const [login, setLogin] = useState<string[]>([])
    const [quitMisc, setQuitMisc] = useState<string[]>([])
    const [country, setCountry] = useState<string[]>([])

    function execute(input : string) {
        setLoading(true)
        resetArrays()
        const lines = input.split("\n")
        console.log("Parsing "+lines.length+" lines")
        lines.forEach(assignLine)

        setCountry(tempCountry)
        setLoginMisc(tempLoginMisc)
        setLogin(tempLogin)
        setQuitMisc(tempQuitMisc)
        setLoading(false)
    }

    function getPlaytime() {
        return {
            start: getFirstLoginPlayTime(loginMisc),
            end: getLastLogoutPlayTime(quitMisc),
            calculated: getPlaytimeFromArray(loginMisc, quitMisc)
        }
    }

    function getNick() {
        return getNickFromArray(login)
    }

    function getAccount() : string {
        return getAccountFromArray(login)
    }

    return {execute, loading, country, login, getPlaytime, getNick, getAccount}
}

function assignLine(line:string) {
    if(line.includes(" LOGIN: ")) tempLogin.push(line)
    if(line.includes(" LOGIN MISC: ")) tempLoginMisc.push(line)
    if(line.includes(" QUIT MISC: ")) tempQuitMisc.push(line)
    if(line.includes(" (MYC ")) tempCountry.push(line)
}

function resetArrays() {
    tempLogin = []
    tempLoginMisc = []
    tempQuitMisc = []
    tempCountry = []
}