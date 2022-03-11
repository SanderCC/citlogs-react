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
let tempSup : string[] = []
let tempAbuse : string[] = []
let tempCountry : string[] = []
let tempBehavior : string[] = []

export function useDivider() {
  const [loading, setLoading] = useState(false)
  const [loginMisc, setLoginMisc] = useState<string[]>([])
  const [login, setLogin] = useState<string[]>([])
  const [quitMisc, setQuitMisc] = useState<string[]>([])
  const [sup, setSup] = useState<string[]>([])
  const [abuse, setAbuse] = useState<string[]>([])
  const [country, setCountry] = useState<string[]>([])
  const [behavior, setBehavior] = useState<string[]>([])

  function execute(input : string) {
    setLoading(true)
    resetArrays()
    const lines = input.split("\n")
    console.log("Parsing "+lines.length+" lines")
    lines.forEach(assignLine)

    setLoginMisc(tempLoginMisc)
    setLogin(tempLogin)
    setQuitMisc(tempQuitMisc)
    setCountry(tempCountry)
    setSup(tempSup)
    setAbuse(tempAbuse)
    setBehavior(tempBehavior)
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

  return {execute, loading, getPlaytime, getNick, getAccount, loginMisc, country, sup, abuse, behavior}
}

function assignLine(line:string) {
  if(line.includes(" LOGIN: ")) tempLogin.push(line)
  if(line.includes(" LOGIN MISC: ")) tempLoginMisc.push(line)
  if(line.includes(" QUIT MISC: ")) tempQuitMisc.push(line)
  if(line.includes(" (sup) ")) tempSup.push(line)

  if(line.includes("warped to ")) {
    if(!line.includes("WL: 0") && !line.includes("with 0 stars") && !line.includes("(EM)")) tempAbuse.push(line)
  }
  if(line.toLowerCase().includes(" abuse ")) tempAbuse.push(line)
  if(line.toLowerCase().includes(" recommendation ")) tempAbuse.push(line)
  if(line.toLowerCase().includes(" leak ")) tempAbuse.push(line)
  if(line.toLowerCase().includes(" bias ")) tempAbuse.push(line)
  if(line.toLowerCase().includes(" accept ")) tempAbuse.push(line)
  if(line.toLowerCase().includes(" rcm ")) tempAbuse.push(line)
  if(line.toLowerCase().includes(" scm ")) tempAbuse.push(line)

  if(line.toLowerCase().includes(" arran ")) tempBehavior.push(line)
  if(line.toLowerCase().includes(" brian ")) tempBehavior.push(line)
  if(line.toLowerCase().includes(" burner ")) tempBehavior.push(line)
  if(line.toLowerCase().includes(" ptole ")) tempBehavior.push(line)
  if(line.toLowerCase().includes(" danzy ")) tempBehavior.push(line)
  if(line.toLowerCase().includes(" head ")) tempBehavior.push(line)
  if(line.toLowerCase().includes(" retard ")) tempBehavior.push(line)
  if(line.toLowerCase().includes(" cunt ")) tempBehavior.push(line)
  if(line.toLowerCase().includes(" dog ")) tempBehavior.push(line)
  if(line.toLowerCase().includes(" sit ")) tempBehavior.push(line)
  if(line.toLowerCase().includes(" administrator ")) tempBehavior.push(line)
  if(line.toLowerCase().includes(" fag ")) tempBehavior.push(line)
  if(line.toLowerCase().includes(" twat ")) tempBehavior.push(line)
  if(line.toLowerCase().includes(" cock ")) tempBehavior.push(line)
  if(line.toLowerCase().includes(" nigger ")) tempBehavior.push(line)
  if(line.toLowerCase().includes(" fucking ")) tempBehavior.push(line)

  if(line.toLowerCase().includes(" st ") && !line.includes("from 0 wanted points.")) tempAbuse.push(line)

  if(line.includes(" (MYC ")) tempCountry.push(line)
}

function resetArrays() {
  tempLogin = []
  tempLoginMisc = []
  tempQuitMisc = []
  tempCountry = []
  tempSup = []
  tempAbuse = []
  tempBehavior = []
}