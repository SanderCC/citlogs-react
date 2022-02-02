export default async function sleep(seconds:number) {
    await setTimeout(() => console.log(`Waiting ${seconds}s`), seconds*60);
}