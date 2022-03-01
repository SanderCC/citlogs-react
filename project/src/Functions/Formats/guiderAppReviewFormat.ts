export default function guiderAppReviewFormat(countryChatCount:number, loginCount:number, playtime:{start: number, end: number, calculated: number}) : string {
    let result = `[color=grey][size=13pt][b]Information gathering template:[/b][/size][/color]\n`
    result += `\n1) [b]Login hits for the past 2 months:[/b] ${loginCount}`
    result += `\n2) [b]Hours before 2 months and Hours Currently:[/b] (${playtime.end}-${playtime.start})/60= ${playtime.calculated}h`
    result += `\n3) [b]Hours and LOGIN hits comparison:[/b] ${playtime.calculated / loginCount}`
    result += `\n4) [b]Country chat hits for the past 2 months:[/b] ${countryChatCount}`
    result += `\n5) [b]Ingame punishments (Punish Log):[/b] [spoiler][/spoiler] `
    result += `\n6) [b]Forum warnings:[/b] [spoiler][/spoiler] `
    result += `\n7) [b]Account Security check:[/b] [spoiler]!getaccountsfromserial !whowas bla bla[/spoiler] `

    return result
}