import {useState} from "react";

let tempLogin : string[] = []
let tempLoginMisc : string[] = []
let tempKills : string[] = []
let tempTTransactions : string[] = []
let tempGTransactions : string[] = []
let tempP2pTransactions : string[] = []
let tempPrivateChats : string[] = []
let tempMain : string[] = []
let tempAdverts : string[] = []
let tempSms : string[] = []
let tempDutyChats : string[] = []
let tempLocal : string[] = []
let tempSupport : string[] = []

export function useDivider() {
    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useState<string[]>([])
    const [loginMisc, setLoginMisc] = useState<string[]>([])
    const [kills, setKills] = useState<string[]>([])
    const [tTransactions, setTTransactions] = useState<string[]>([])
    const [gTransactions, setGTransactions] = useState<string[]>([])
    const [p2pTransactions, setP2pTransactions] = useState<string[]>([])
    const [privateChats, setPrivateChats] = useState<string[]>([])
    const [main, setMain] = useState<string[]>([])
    const [adverts, setAdverts] = useState<string[]>([])
    const [sms, setSms] = useState<string[]>([])
    const [local, setLocal] = useState<string[]>([])
    const [dutyChats, setDutyChats] = useState<string[]>([])
    const [support, setSupport] = useState<string[]>([])

    function execute(input : string) {
        setLoading(true)
        resetArrays()
        const lines = input.split("\n")
        console.log("Parsing "+lines.length+" lines")
        lines.forEach(assignLine)

        setLogin(tempLogin)
        setLoginMisc(tempLoginMisc)
        setKills(tempKills)
        setTTransactions(tempTTransactions)
        setGTransactions(tempGTransactions)
        setP2pTransactions(tempP2pTransactions)
        setPrivateChats(tempPrivateChats)
        setMain(tempMain)
        setAdverts(tempAdverts)
        setSms(tempSms)
        setDutyChats(tempDutyChats)
        setLocal(tempLocal)
        setSupport(tempSupport)

        setLoading(false)
    }

    return {execute, loading, kills, login, support, loginMisc, tTransactions, gTransactions, p2pTransactions, privateChats, local, main, adverts, sms, dutyChats}
}

function assignLine(line:string) {
    if(line.includes(" LOGIN: ")) tempLogin.push(line)
    if(line.includes(" QUIT: ")) tempLogin.push(line)

    if(line.includes(" LOGIN MISC: ")) tempLoginMisc.push(line)
    if(line.includes(" QUIT MISC: ")) tempLoginMisc.push(line)
    if(line.includes(" QUIT WEPS: ")) tempLoginMisc.push(line)

    if(line.includes(" KILL: ")) tempKills.push(line)
    if(line.includes(" DEATH: ")) tempKills.push(line)

    if(line.includes(" G$ ")) tempGTransactions.push(line)
    if(line.includes(" T$ ")) tempTTransactions.push(line)
    if(line.includes(" (CITphoneTranTo ")) tempTTransactions.push(line)
    if(line.includes(" (CITphoneTranFrom ")) tempP2pTransactions.push(line)

    if(line.includes(" (GD) ")) tempDutyChats.push(line)
    if(line.includes(" (EM) ")) tempDutyChats.push(line)
    if(line.includes(" (DJ) ")) tempDutyChats.push(line)
    if(line.includes(" (SO) ")) tempDutyChats.push(line)
    if(line.includes(" (PC) ")) tempDutyChats.push(line)
    if(line.includes(" (CB) ")) tempDutyChats.push(line)
    if(line.includes(" CITC ")) tempDutyChats.push(line)

    if(line.includes(" (FMSG) ")) tempPrivateChats.push(line)
    if(line.includes(" SC (")) tempPrivateChats.push(line)
    if(line.includes(" SSC (")) tempPrivateChats.push(line)
    if(line.includes(" GrC (")) tempPrivateChats.push(line)
    if(line.includes(" GSC (")) tempPrivateChats.push(line)
    if(line.includes(" UC (")) tempPrivateChats.push(line)

    if(line.includes(" TC: [")) tempMain.push(line)
    if(line.includes(" (Admin LS) ")) tempMain.push(line)
    if(line.includes(" (Admin LV) ")) tempMain.push(line)
    if(line.includes(" (Admin SF) ")) tempMain.push(line)
    if(line.includes(" MC LS: ")) tempMain.push(line)
    if(line.includes(" MC SF: ")) tempMain.push(line)
    if(line.includes(" MC LV: ")) tempMain.push(line)
    if(line.includes(" (MYC ")) tempMain.push(line)

    if(line.includes(" SMS from ")) tempSms.push(line)
    if(line.includes(" SMS to ")) tempSms.push(line)

    if(line.includes(" (ADVERT) ")) tempAdverts.push(line)

    if(line.includes(" (LOC)[")) tempLocal.push(line)
    if(line.includes(" (LOCF)[")) tempLocal.push(line)

    if(line.includes(" (cad) ")) tempSupport.push(line)
    if(line.includes(" (sup) ")) tempSupport.push(line)
}

function resetArrays() {
    tempLogin = []
    tempLoginMisc = []
    tempKills = []
    tempTTransactions = []
    tempGTransactions = []
    tempGTransactions = []
    tempMain = []
    tempPrivateChats = []
    tempAdverts = []
    tempSms = []
    tempDutyChats = []
    tempLocal = []
    tempSupport = []
}