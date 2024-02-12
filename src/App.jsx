import React, { useState, useEffect } from "react"
import RegexComponent from "./shared/components/RegexComponent.jsx"
import CollapsibleComponent from "./shared/components/CollapsibleComponent.jsx"
import TextInfo from "./shared/components/TextInfo.jsx"
import ExpressionLexer from "./shared/utils/ExpressionLexer.js"
import Reference from "./shared/utils/Reference.js"
import reference_content from "./shared/utils/Reference_content.js"
import validate from "./shared/utils/ValidateRegex.js"
import MonacoEditor from "./shared/components/MonacoEditor.jsx"
import { AddClass, UseExternalScripts } from "./shared/utils/useExternalScripts.js"

export default function App(props) {
    UseExternalScripts(
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    )

    UseExternalScripts(
        "https://d1hvi6xs55woen.cloudfront.net/website-assets/polaris.css"
    )

    AddClass(
        ".highlight {background:rgba(174, 233, 209, 0.5);} @media screen and (max-width: 950px) { .tool-container{ flex-direction: column !important; height: unset !important;} .editor-container{ width: 100% !important;}.info-dropdown{overflow: hidden !important;}.input-container{padding: 12px !important;} .explanation-container{ flex: unset !important;height: 80vh !important;}.text-container{width: 80vw !important;}}"
    )

    const [regex, setRegex] = useState(props.regex || "(a+)+")
    const [userText, setUserText] = useState(props.sample_text || "")
    const [highlightedText, setHighlightedText] = useState([])
    const [selectedLanguage, setSelectedLanguage] = useState(
        props.language || "Python"
    )
    const [securityIssuesExpanded, setSecurityIssuesExpanded] = useState(false)
    const [explanationExpanded, setExplanationExpanded] = useState(false)
    const [matchInfoExpanded, setMatchInfoExpanded] = useState(false)
    const [flags, setFlags] = useState("gm")
    const [explanation, setExplanation] = useState([])
    const [isEvilRegex, setIsEvilRegex] = useState(false)

    const lexer = new ExpressionLexer()
    const reference = new Reference(reference_content)

    const [matchCount, setMatchCount] = useState(0)

    const handleRegexChange = (event) => {
        try {
            setIsEvilRegex(!validate(event.target.value))
        } catch (error) {
            setIsEvilRegex(false)
        }
        setRegex(event.target.value)
    }

    useEffect(() => {
        if (isEvilRegex) {
            setSecurityIssuesExpanded(true)
        }
    }, [isEvilRegex])

    const textForIssue = (
        <div>
            Taking the github repo{" "}
            <a
                className="Polaris-Link"
                href="https://github.com/inno-v/safe-regex"
                target="_blank"
            >
                safe-regex{" "}
            </a>{" "}
            as reference
            {isEvilRegex ? (
                <span>
                    This regular expression is marked as <b>EVIL</b>. Please use
                    it with caution.
                </span>
            ) : (
                <span>
                    This regular expression appears to be <b>SAFE</b> for use.
                </span>
            )}
        </div>
    )

    useEffect(() => {
        const token = lexer.parse("/" + regex + "/" + flags)
        let cursor = token
        let contentArr = []
        let temp = "/" + flags
        if (temp.length > 1) {
            while ((cursor = cursor.next) && cursor.type !== "close") {
                if (cursor.proxy || (cursor.open && cursor.open.proxy)) {
                    continue
                }
                let i = cursor.i
                let end = cursor.i + cursor.l
                let content = regex
                    .substring(i - 1, end - 1)
                    .replace("<", "&lt;")
                if (cursor.set) {
                    let set0 = cursor.set[0],
                        set2 = cursor.set[2]
                    content = regex.substring(set0.i - 1, set0.i + set0.l - 1)
                    content += regex.substring(i - 1, end - 1)
                    content += regex.substring(set2.i - 1, set2.i + set2.l - 1)
                }
                contentArr.push({
                    title: content,
                    value: reference.tipForToken(cursor),
                })
            }
            setExplanation(contentArr)
        }
    }, [flags, regex])

    const getMatchInfo = (val) => {
        setHighlightedText(val)
        if (val.length > 0) {
            setMatchInfoExpanded(true)
        }
        setMatchCount(val.length)
    }

    const totalOpen =
        (securityIssuesExpanded === true) +
        (explanationExpanded === true) +
        (matchInfoExpanded === true)

    // const maxHeight = totalOpen === 3 ? '8vw' : totalOpen === 2 ? `calc(30vh - 56px)` : `calc(60vh - 128px)`
    const maxHeight =
        totalOpen === 3
            ? "17vh"
            : totalOpen === 2
              ? `calc(32vh - 56px)`
              : `calc(62vh - 128px)`

    const containerHeight =
        totalOpen === 3
            ? "25vh"
            : totalOpen === 2
              ? `calc(42vh - 56px)`
              : `calc(80vh - 128px)`

    return (
        <div
            className="Polaris-Card"
            style={{
                padding: "0px",
                width: "100%",
                maxWidth: "100%",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #E2E1E5",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                    borderBottom: "1px solid #AEB4B9",
                    minHeight: "8vh",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                    }}
                >
                    <span style={{ fontWeight: 600 }}> Regex Tester</span>
                    <span>
                        {" "}
                        Online tools to learn, build & test Regular Expression
                        (RegEx/RegExp)
                    </span>
                </div>
                {/* <Button onClick={() =>{}} buttonText={"Cheatsheet"} /> */}
            </div>
            <div
                style={{ display: "flex", height: "85vh" }}
                className="tool-container"
            >
                <div
                    style={{
                        flex: "2",
                        flexDirection: "column",
                        gap: "16px",
                        display: "flex",
                        padding: "20px",
                    }}
                    className="input-container"
                >
                    <RegexComponent
                        regex={regex}
                        handleRegexChange={handleRegexChange}
                        matchCount={matchCount}
                        setLanguage={(opt) => setSelectedLanguage(opt.value)}
                        currentLang={selectedLanguage}
                        text={userText}
                        getFlags={setFlags}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                        }}
                    >
                        <label
                            htmlFor="bodyDiv"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            Test string:
                        </label>
                        <div className="editor">
                            <MonacoEditor
                                regex={regex}
                                extractMatches={getMatchInfo}
                                extractCurrentValue={setUserText}
                                defaultValue={userText}
                            />
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        flex: "1",
                        borderLeft: "1px solid #E2E1E5",
                        padding: "12px",
                        display: "flex",
                    }}
                    className="explanation-container"
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                flex: securityIssuesExpanded ? "10" : "",
                                backgroundColor: "#f6f6f7",
                                borderRadius: "4px",
                                maxHeight: `${containerHeight}`,
                            }}
                            className="info-dropdown"
                        >
                            <CollapsibleComponent
                                isExpanded={securityIssuesExpanded}
                                onClickFunc={() =>
                                    setSecurityIssuesExpanded(
                                        !securityIssuesExpanded
                                    )
                                }
                                textComponent={
                                    <TextInfo
                                        textInfo={[]}
                                        emptyText={textForIssue}
                                        totalOpen={totalOpen}
                                        typeText={"Security issue"}
                                    />
                                }
                                title={"Possible security issues"}
                                maxHeight={maxHeight}
                            />
                        </div>
                        <div
                            style={{
                                flex: explanationExpanded ? "10" : "",
                                backgroundColor: "#f6f6f7",
                                borderRadius: "4px",
                                maxHeight: `${containerHeight}`,
                            }}
                            className="info-dropdown"
                        >
                            <CollapsibleComponent
                                isExpanded={explanationExpanded}
                                onClickFunc={() =>
                                    setExplanationExpanded(!explanationExpanded)
                                }
                                textComponent={
                                    <TextInfo
                                        textInfo={explanation}
                                        emptyText={"Enter a regex in the input"}
                                        totalOpen={totalOpen}
                                        typeText={"Explanation"}
                                    />
                                }
                                title={"Explanation"}
                                maxHeight={maxHeight}
                            />
                        </div>
                        <div
                            style={{
                                flex: matchInfoExpanded ? "10" : "",
                                backgroundColor: "#f6f6f7",
                                borderRadius: "4px",
                                maxHeight: `${containerHeight}`,
                            }}
                            className="info-dropdown"
                        >
                            <CollapsibleComponent
                                isExpanded={matchInfoExpanded}
                                onClickFunc={() =>
                                    setMatchInfoExpanded(!matchInfoExpanded)
                                }
                                textComponent={
                                    <TextInfo
                                        totalOpen={totalOpen}
                                        textInfo={highlightedText}
                                        emptyText={
                                            "No matches found in the text."
                                        }
                                    />
                                }
                                title={"Match information"}
                                maxHeight={maxHeight}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    background: "#fafafb",
                    padding: "20px",
                    width: "100%",
                }}
            >
                <img
                    src="https://akto-setup.s3.amazonaws.com/templates/128x128.png"
                    alt="Akto.io"
                    style={{ height: "24px" }}
                />
            </div>
        </div>
    )
}

App.defaultProps = {
    language: "python",
    regex: "(a+)+",
    sample_text: "",
}
