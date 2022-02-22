import {Box, Grid, TextField} from "@mui/material";

export function ContentArea({title, content, size=4}: { title: string, content: string[], size?:number }) {
    if(content.length < 3) return <></>
    return <Grid item xs={size}>
        <Box sx={{m: 1}}>
            <h3>{title} <small>({content.length} lines)</small></h3>
            <TextField sx={{width: "100%"}} multiline rows={7} disabled value={content.join("\n")}/>
        </Box>
    </Grid>
}