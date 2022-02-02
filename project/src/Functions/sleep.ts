export default function sleep(seconds:number) {
    setTimeout(() => console.log(`Waiting ${seconds}s`), seconds*60);
}