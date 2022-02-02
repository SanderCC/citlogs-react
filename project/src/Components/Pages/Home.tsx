import {Typography} from "@mui/material";
import RandomCat from "../Particles/CatApi";

export default function Home() {
    return <div>
        <CitBanner />
        <SmallText />
        <RandomCat />
    </div>
}

function CitBanner() {
    return <img style={{margin: 5}} src={"https://cit.gg/Themes/Analysis_20/images/img/logo.png"}  alt={"citlogo"}/>
}

function SmallText() {
    return <Typography variant={"body1"}>A parser made by Ptole in ReactJS, to make reviews easier.</Typography>
}
