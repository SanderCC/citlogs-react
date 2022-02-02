import {useState} from "react";

export default function RandomCat() {
    const cat = useCat()

    return <div onClick={cat.refresh}>
        <img src={cat.img}  alt={"cat"} style={{maxHeight: 300, maxWidth: 300, cursor: "pointer", borderRadius: 3}}/>
    </div>

}

function useCat() {
    const [img, setImg] = useState<string>("https://thecatapi.com/api/images/get?format=src&type=gif")
    const [counter, setCounter] = useState(0)

    async function refresh() {
        setCounter(counter+1)
        setImg("https://thecatapi.com/api/images/get?format=src&type=gif&rand="+counter)
    }

    return {img, refresh}
}