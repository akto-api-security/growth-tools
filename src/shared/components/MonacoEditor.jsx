import React, { useEffect, useRef, useState } from "react"
import * as monaco from "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/+esm"
import Utils from "../utils/Utils"

const MonacoEditor = ({
    regex,
    extractMatches,
    extractCurrentValue,
    defaultValue,
}) => {
    const ref = useRef(null)
    const [instance, setInstance] = useState(undefined)
    const decIds = useRef([])

    function createInstance() {
        const yamlEditorOptions = {
            language: "text",
            minimap: { enabled: false },
            wordWrap: true,
            automaticLayout: true,
            colorDecorations: true,
            scrollBeyondLastLine: false,
            lightbulb: { enabled: false },
            scrollbar: {
                alwaysConsumeMouseWheel: false,
            },
            lineNumbers: false,
            renderLineHighlight: "none",
            value: defaultValue || "Insert your test string here",
        }

        setInstance((ins) => {
            if (ins) return ins
            return monaco.editor.create(ref.current, yamlEditorOptions)
        })
    }

    useEffect(() => {
        if (instance === undefined) {
            createInstance()
        }
    }, [])

    const [valChange, setValChange] = useState(true)

    useEffect(() => {
        Utils.findMatchesStr(regex, instance, decIds, extractMatches, monaco)
    }, [valChange])

    if (instance !== undefined) {
        try {
            instance.onDidChangeModelContent(() => {
                setValChange(!valChange)
                extractCurrentValue(instance.getValue())
            })
        } catch (error) {}
    }

    useEffect(() => {
        Utils.findMatchesStr(regex, instance, decIds, extractMatches, monaco)
    }, [regex])

    useEffect(() => {
        if (instance && defaultValue) {
            Utils.findMatchesStr(
                regex,
                instance,
                decIds,
                extractMatches,
                monaco
            )
        }
    }, [instance, defaultValue])

    return (
        <div
            ref={ref}
            style={{
                height: "54vh",
                borderRadius: "4px",
                border: "1px solid #AEB4B9",
                boxShadow: "0px 1px 0px 0px #898F94 inset",
                paddingTop: "8px",
                width: "45.5vw",
            }}
            className="editor-container"
        />
    )
}

export default MonacoEditor
