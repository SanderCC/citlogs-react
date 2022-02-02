import {Box, TextField} from "@mui/material";

export function ContentArea({title, content} : {title:string, content:string[]}) {
    return <Box sx={{m: 1}}>
        <h3>{title} <small>({content.length} lines)</small></h3>
        <TextField sx={{width: "100%"}} multiline rows={7} disabled value={content.join("\n")} />
    </Box>
}