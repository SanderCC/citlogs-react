import {Button, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useClipboard} from "../../Functions/Hooks/Clipboard";
import {ContentArea} from "../Particles/ContentArea";
import {numberWithCommas} from "../../Functions/number";
import {useDivider} from "../../Functions/Dividers/adminDivider";
import adminReviewFormat from "../../Functions/Formats/adminReviewFormat";

export default function Admin() {
    const [input, setInput] = useState("")
    const divider = useDivider()
    const clipboard = useClipboard()
    const format = adminReviewFormat(
        divider.getNick(), divider.getAccount(), divider.getRank(), divider.getPlaytime(),
        divider.loginMisc.length, divider.jails.length, divider.mutes.length,
        divider.bans.length, divider.citc.length, divider.cad.length, divider.cm.length,
        divider.logsFetched.length, divider.dutyRelated.length
    )

    if(divider.loading) return <>Loading...</>

    async function parseClipboard() {
        divider.execute(await clipboard.get())
    }

    async function executeDivider() {
        divider.execute(input)
    }

    async function pasteFormatToClipboard() {
        await clipboard.put(format)
    }

    return <>
        <ParseInfo input={input} />
        <TextField value={input} sx={{width: "100%", m: 1}} rows={7} multiline onChange={e => setInput(e.target.value)}/>
        <Button color={"warning"} onClick={async () => setInput(await clipboard.get())}>Paste clipboard</Button>
        <Button onClick={parseClipboard} sx={{mx: 5}}>Parse clipboard</Button>
        <Button color={"secondary"} onClick={executeDivider}>Parse input</Button>
        <TextField sx={{width: "100%", m: 1}} multiline value={format} />
        <Button color={"success"} onClick={pasteFormatToClipboard}>Copy Format</Button>
        <Grid container>
            <Grid item xs={4}>
                <ContentArea title={"CITC"} content={divider.citc} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"Bans"} content={divider.bans} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"Jails"} content={divider.jails} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"Jails"} content={divider.mutes} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"Possible Abuse"} content={divider.abuse} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"Duty Related"} content={divider.dutyRelated} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"Contact Admin"} content={divider.cad} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"Support"} content={divider.sup} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"Complaints"} content={divider.cm} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"Logs Fetched"} content={divider.logsFetched} />
            </Grid>
        </Grid>
    </>
}

function ParseInfo({input} : {input:string}) {
    return <Typography variant={"h5"} sx={{p:1}}>
        {input.length === 0 ?
            <>Insert your logfile</> : <>{numberWithCommas(input.length)} characters, {numberWithCommas(input.split("\n").length)} lines</>
        }
    </Typography>
}