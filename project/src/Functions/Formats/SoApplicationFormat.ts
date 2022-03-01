export default function soApplicationFormat(nick:string, account:string, teamChat:string[], playtime:{start: number, end: number, calculated: number}) : string {
    let result = `[color=${titleColor(getStrikes(teamChat.length, playtime.calculated))}][b][size=14pt]SO Review[/size][/b][/color][hr]`
    result += `\n[b]Nick: [/b]${nick}`
    result += `\n[b]Account: [/b]${account}`
    result += `\n[b]Hours played: [/b](${playtime.end}-${playtime.start})/60= ${playtime.calculated}h`
    result += `\n[b]Punishlog: [/b][spoiler][/spoiler] `
    result += `\n[b]Forum warnings: [/b][spoiler][/spoiler] `
    result += `\n[b]TC Hits: [/b]${teamChat.length} [spoiler]${teamChat.join("\n")}[/spoiler] `

    return result
}

function getStrikes(chatCount:number, playtime:number) : number {
    let strikes = 0
    if(chatCount < 69) strikes++
    if(playtime < 29) strikes++
    return strikes
}

function titleColor(strikes:number) : string {
    switch (strikes) {
        case 3: return "darkred"
        case 2: return "red"
        case 1: return "orange"
        default: return "green"
    }
}