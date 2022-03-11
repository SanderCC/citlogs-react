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
let tempCitc : string[] = []
let tempBans : string[] = []
let tempJails : string[] = []
let tempMutes : string[] = []
let tempLogsFetched : string[] = []
let tempCm : string[] = []
let tempCad : string[] = []
let tempSup : string[] = []
let tempAbuse : string[] = []
let tempDutyRelated : string[] = []
let tempStaffWarps : string[] = []

export function useDivider() {
    const [loading, setLoading] = useState(false)
    const [loginMisc, setLoginMisc] = useState<string[]>([])
    const [login, setLogin] = useState<string[]>([])
    const [quitMisc, setQuitMisc] = useState<string[]>([])
    const [citc, setCitc] = useState<string[]>([])
    const [bans, setBans] = useState<string[]>([])
    const [jails, setJails] = useState<string[]>([])
    const [mutes, setMutes] = useState<string[]>([])
    const [logsFetched, setLogsFetched] = useState<string[]>([])
    const [cm, setCm] = useState<string[]>([])
    const [cad, setCad] = useState<string[]>([])
    const [sup, setSup] = useState<string[]>([])
    const [abuse, setAbuse] = useState<string[]>([])
    const [staffWarps, setStaffWarps] = useState<string[]>([])
    const [dutyRelated, setDutyRelated] = useState<string[]>([])

    function execute(input : string) {
        setLoading(true)
        resetArrays()
        const lines = input.split("\n")
        console.log("Parsing "+lines.length+" lines")
        lines.forEach(assignLine)

        setLoginMisc(tempLoginMisc)
        setLogin(tempLogin)
        setQuitMisc(tempQuitMisc)
        setCitc(tempCitc)
        setBans(tempBans)
        setJails(tempJails)
        setMutes(tempMutes)
        setLogsFetched(tempLogsFetched)
        setCm(tempCm)
        setCad(tempCad)
        setSup(tempSup)
        setAbuse(tempAbuse)
        setDutyRelated(tempDutyRelated)
        setStaffWarps(tempStaffWarps)
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

    function getRank() : string {
        return getAdminRank(staffWarps)
    }

    return {execute, loading, getPlaytime, getNick, getAccount, loginMisc, bans, jails, mutes, logsFetched, cm, cad, sup, abuse, dutyRelated, citc, getRank}
}

function assignLine(line:string) {
    if(line.includes(" LOGIN: ")) tempLogin.push(line)
    if(line.includes(" LOGIN MISC: ")) tempLoginMisc.push(line)
    if(line.includes(" QUIT MISC: ")) tempQuitMisc.push(line)

    if(line.includes(" CITC ")) tempCitc.push(line)

    if(line.includes(" (AA)(BAN) ")) tempBans.push(line)
    if(line.includes(" (AA)(MUTE) ")) tempJails.push(line)
    if(line.includes(" (AA)(JAIL) ")) tempMutes.push(line)

    if(line.includes(" (AA)(CONTACTADMIN) ")) tempCad.push(line)
    if(line.includes(" (AA)(SUPPORT) ")) tempSup.push(line)

    if(line.includes(" opened '") && line.includes(" ms")) tempLogsFetched.push(line)
    if(line.includes(" [CM] ") && line.includes(" set ")) tempCm.push(line)

    if(line.includes("warped to ")) {
        if(!line.includes("WL: 0") && !line.includes("with 0 stars") && !line.includes("(EM)")) tempAbuse.push(line)
        if(line.includes(" (Warp Map) ") && line.includes("Staff with ")) tempStaffWarps.push(line)
    }
    if(line.toLowerCase().includes(" abuse ")) tempAbuse.push(line)
    if(line.toLowerCase().includes(" recommendation ")) tempAbuse.push(line)
    if(line.toLowerCase().includes(" leak ")) tempAbuse.push(line)
    if(line.toLowerCase().includes(" bias ")) tempAbuse.push(line)
    if(line.toLowerCase().includes(" accept ")) tempAbuse.push(line)
    if(line.toLowerCase().includes(" rcm ")) tempAbuse.push(line)
    if(line.toLowerCase().includes(" scm ")) tempAbuse.push(line)
    if(line.toLowerCase().includes(" arran ")) tempAbuse.push(line)
    if(line.toLowerCase().includes(" brian ")) tempAbuse.push(line)
    if(line.toLowerCase().includes(" burner ")) tempAbuse.push(line)
    if(line.toLowerCase().includes(" ptole ")) tempAbuse.push(line)
    if(line.toLowerCase().includes(" danzy ")) tempAbuse.push(line)
    if(line.toLowerCase().includes(" head ")) tempAbuse.push(line)
    if(line.toLowerCase().includes(" administrator ")) tempAbuse.push(line)
    if(line.toLowerCase().includes(" st ") && !line.includes("from 0 wanted points.")) tempAbuse.push(line)

    if(line.includes("object. ID:")) tempDutyRelated.push(line)
    if(line.includes("changed account:")) tempDutyRelated.push(line)
    if(line.includes("changed the password of account")) tempDutyRelated.push(line)
    if(line.includes("checked the PIN code of account")) tempDutyRelated.push(line)
    if(line.includes("zone 0 p")) tempDutyRelated.push(line)
}

function getAdminRank(staffWarps:string[]) : string {
    if(staffWarps.filter(l => l.includes("L5 Staff")).length > 0) return "L5"
    if(staffWarps.filter(l => l.includes("L4 Staff")).length > 0) return "L4"
    if(staffWarps.filter(l => l.includes("L3 Staff")).length > 0) return "L3"
    if(staffWarps.filter(l => l.includes("L2 Staff")).length > 0) return "L2"
    if(staffWarps.filter(l => l.includes("L1 Staff")).length > 0) return "L1"
    return "L<?>"
}

function resetArrays() {
    tempLogin = []
    tempLoginMisc = []
    tempQuitMisc = []
    tempCitc = []
    tempBans = []
    tempJails = []
    tempMutes = []
    tempLogsFetched = []
    tempCm = []
    tempCad = []
    tempSup = []
    tempAbuse = []
    tempDutyRelated = []
    tempStaffWarps = []
}