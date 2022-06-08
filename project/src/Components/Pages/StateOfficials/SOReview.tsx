import {Button, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useDivider} from "../../../Functions/Dividers/soDivider";
import {useClipboard} from "../../../Functions/Hooks/Clipboard";
import {ContentArea} from "../../Particles/ContentArea";
import {numberWithCommas} from "../../../Functions/number";
import soReviewFormat from "../../../Functions/Formats/SoReviewFormat";

export default function SOReview() {
    const [input, setInput] = useState("")
    const [month, setMonth] = useState("")
    const [preferClipboard, setPreferClipboard] = useState(true)
    const divider = useDivider()
    const clipboard = useClipboard()
    const format = soReviewFormat(divider.getNick(), divider.getAccount(), divider.events.length, divider.quizzes.length, divider.team.length, divider.getPlaytime())

    if (divider.loading) return <>Loading...</>

    async function parseClipboard() {
        if(!preferClipboard) setPreferClipboard(true)
        divider.execute(await clipboard.get(), month)
    }

    async function executeDivider() {
        if(preferClipboard) setPreferClipboard(false)
        divider.execute(input, month)
    }

    async function pasteFormatToClipboard() {
        await clipboard.put(format)
    }

    async function changeMonth(newValue:string) {
        setMonth(newValue)
        /*if(preferClipboard) {
            await parseClipboard()
        } else {
            await executeDivider()
        }*/
    }

    return <>
        <ParseInfo input={input}/>
        <TextField value={month}
                   placeholder={"Month filter"}
                   sx={{width: "100%", m: 1}}
                   onChange={e => changeMonth(e.target.value)} />
        <TextField value={input}
                   sx={{width: "100%", m: 1}}
                   placeholder={"Insert logs or use clipboard"}
                   rows={7}
                   multiline
                   onChange={e => setInput(e.target.value)}/>
        <Button color={"warning"} onClick={async () => setInput(await clipboard.get())}>Paste clipboard</Button>
        <Button onClick={parseClipboard} sx={{mx: 5}}>Parse clipboard</Button>
        <Button color={"secondary"} onClick={executeDivider}>Parse input</Button>
        <TextField sx={{width: "100%", m: 1}} multiline value={format}/>
        <Button color={"success"} onClick={pasteFormatToClipboard}>Copy Format</Button>
        <Grid container>
            <ContentArea title={"Team"} content={divider.team}/>
            <ContentArea title={"Events"} content={divider.events}/>
            <ContentArea title={"Quizzes"} content={divider.quizzes}/>
        </Grid>
    </>
}

function ParseInfo({input}: { input: string }) {
    return <Typography variant={"h5"} sx={{p: 1}}>
        {input.length === 0 ?
            <>Insert your
                logfile</> : <>{numberWithCommas(input.length)} characters, {numberWithCommas(input.split("\n").length)} lines</>
        }
    </Typography>
}