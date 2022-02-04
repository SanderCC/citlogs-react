export default function adminReviewFormat(nick:string,
                                          account:string,
                                          rank:string,
                                          playtime:{start: number, end: number, calculated: number},
                                          logins:number,
                                          jails:number,
                                          mutes:number,
                                          bans:number,
                                          citc:number,
                                          cad:number,
                                          cm:number,
                                          logsFetched:number,
                                          dutyRelated:number) {
    const notes = feedback(bans, mutes, jails, cm, citc)
    let result = ""
    result += `[center][size=13pt][b]Team 2:[/b][/size][/center][br][hr]`
    result += `\n\n${rank}. [url=https://cit.gg/index.php?action=profile;u=FORUMCODE]${nick}[/url] (${account}):`
    result += `\n\n[b]Name: [color=${notes.color}]${nick}[/color][/b]`
    result += `\n[b]Account name:[/b] ${account}`
    result += `\n[b]Rank:[/b] ${rank}`
    result += `\n[b]Duties:[/b] TO_BE_FILLED_IN`
    result += `\n[b]Hours played:[/b] (${playtime.end}-${playtime.start})/60 = ${playtime.calculated}h`
    result += `\n[b]Login hits:[/b] ${logins}`
    result += `\n[b]CITC hits:[/b] ${citc}`
    result += `\n[b]Admin actions:[/b] ${mutes+jails+bans} (+${logsFetched} Logs opened for L3)`
    result += `\n[b]Mutes:[/b] ${mutes}`
    result += `\n[b]Jails:[/b] ${jails}`
    result += `\n[b]Bans:[/b] ${bans}`
    result += `\n[b]Forum Warnings:[/b] TO_BE_FILLED_IN`
    result += `\n[b]Contact Admin:[/b] ${cad}`
    result += `\n[b]Reports:[/b] ${cm} [CM] actions taken.`
    result += `\n[b]Abuse:[/b] TO_BE_FILLED_IN`
    result += `\n[b]Duty related actions:[/b] ${dutyRelated}`
    result += `\n\n[i]Additional notes:[/i] ${notes.message}`
    result += `\n\n[hr]`
    return result
}

function feedback(bans:number, mutes:number, jails:number, reports:number, citc:number) : { message:string, color:string } {
    let actionsCounter = 0;
    actionsCounter += bans * 1.3;
    actionsCounter += mutes;
    actionsCounter += jails * 1.1;
    actionsCounter += reports * 1.4;
    actionsCounter += citc * 0.2;
    if (actionsCounter < 30)
    {
        return {message: "Low in-game activity", color: "red"};
    }

    if (actionsCounter < 60)
    {
        return {message: "In-game activity is fine with room for improvement", color: "orange"};
    }

    return {message: "Decent in-game activity", color: "green"};
}