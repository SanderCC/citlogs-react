export default function staffApplicationFormat(account:string,
                                          playtime:{start: number, end: number, calculated: number},
                                          logins:number,
                                          country:number,
                                          support:number) {
  const defaultValue = "<TO_DO_MANUALLY>"
  let result = ""
  result += `[b]Account:[/b] ${account}`
  result += `\n[b]Punishlog:[/b] ${defaultValue}`
  result += `\n[b]Support chat:[/b] ${support}`
  result += `\n[b]Country chat:[/b] ${country}`
  result += `\n[b]Logins:[/b] ${logins} (with an average of ${Math.round((playtime.end-playtime.start)/logins)}min per session)`
  result += `\n[b]Hours played:[/b] (${playtime.end}-${playtime.start})/60 = ${playtime.calculated}h`
  result += `\n[b]Account security check:[/b] ${defaultValue}`
  result += `\n[b]Forum warnings log:[/b] ${defaultValue}`
  return result
}