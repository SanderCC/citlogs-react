export default function soReviewFormat(nick:string, account:string, eventCount:number, quizCount:number, chatCount:number, playtime:{start: number, end: number, calculated: number}) : string {
    let result = `[color=${titleColor(getStrikes(eventCount+quizCount, chatCount, playtime.calculated))}][b][size=14pt]SO Review[/size][/b][/color][hr]`
    result += `\n[b]Nick: [/b]${nick}`
    result += `\n[b]Account: [/b]${account}`
    result += `\n[b]Hours played: [/b](${playtime.end}-${playtime.start})/60= ${playtime.calculated}h`
    result += `\n[b]TC Hits: [/b]${chatCount}`
    result += `\n[b]Event hits: [/b]${eventCount+quizCount} (${quizCount} quizzes + ${eventCount} events)`
    result += `\n[b]Advice: [/b]${getAdvice(eventCount+quizCount, chatCount, playtime.calculated)}`

    return result
}

function getAdvice(activityCount:number, chatCount:number, playtime:number) : string {
    let result = "";
    if (activityCount < 15) result += "\nShould host more events.";
    if (chatCount < 70) result += "\nShould socialize more with the other civilians.";
    if (playtime < 30) result += "\nShould boost playtime.";

    if (result.length > 5) return result;
    return "No issues to report.";
}

function getStrikes(activityCount:number, chatCount:number, playtime:number) : number {
    let strikes = 0
    if(activityCount < 15) strikes++
    if(chatCount < 70) strikes++
    if(playtime < 28) strikes++
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