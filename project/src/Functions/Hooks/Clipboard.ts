export function useClipboard() {
    return {get, put}
}

async function get() {
    return await navigator.clipboard.readText()
}

async function put(text:string) {
    await navigator.clipboard.writeText(text)
}