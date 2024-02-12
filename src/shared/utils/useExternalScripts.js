import { useEffect } from "react"

function UseExternalScripts(url) {
    useEffect(() => {
        const head = document.querySelector("head")
        const script = document.createElement("link")

        script.setAttribute("rel", "stylesheet")
        script.setAttribute("href", url)
        head.appendChild(script)

        return () => {
            head.removeChild(script)
        }
    }, [url])
}

function AddClass(css) {
    useEffect(() => {
        const head = document.querySelector("head")
        const script = document.createElement("style")

        script.appendChild(document.createTextNode(css))
        head.appendChild(script)

        return () => {
            head.removeChild(script)
        }
    }, [css])
}

export {AddClass, UseExternalScripts}
