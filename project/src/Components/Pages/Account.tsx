import {Button, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useClipboard} from "../../Functions/Hooks/Clipboard";
import {ContentArea} from "../Particles/ContentArea";
import {numberWithCommas} from "../../Functions/number";
import {useDivider} from "../../Functions/Dividers/accountDivider";

export default function Account() {
    const [input, setInput] = useState("")
    const divider = useDivider()
    const clipboard = useClipboard()

    if(divider.loading) return <>Loading...</>

    async function parseClipboard() {
        divider.execute(await clipboard.get())
    }

    async function executeDivider() {
        divider.execute(input)
    }

    return <>
        <ParseInfo input={input} />
        <TextField value={input} sx={{width: "100%", m: 1}} rows={7} multiline onChange={e => setInput(e.target.value)}/>
        <Button color={"warning"} onClick={async () => setInput(await clipboard.get())}>Paste clipboard</Button>
        <Button onClick={parseClipboard} sx={{mx: 5}}>Parse clipboard</Button>
        <Button color={"secondary"} onClick={executeDivider}>Parse input</Button>
        <Grid container>
            <Grid item xs={4}>
                <ContentArea title={"Login/Quit"} content={divider.login} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"Login/Quit MISC"} content={divider.loginMisc} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"Kill/Deaths"} content={divider.kills} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"P2P Transactions"} content={divider.p2pTransactions} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"T$ Transactions"} content={divider.tTransactions} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"G$ Transactions"} content={divider.gTransactions} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"Main/Team/Country Chat"} content={divider.main} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"Adverts"} content={divider.adverts} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"SMS"} content={divider.sms} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"Private Chats"} content={divider.privateChats} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"Local"} content={divider.local} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"Duty Chats"} content={divider.dutyChats} />
            </Grid>
            <Grid item xs={4}>
                <ContentArea title={"CAD/SUP"} content={divider.support} />
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