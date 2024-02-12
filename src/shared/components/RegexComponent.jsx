import React, { useRef, useState, useEffect } from "react"
import SelectFlags from "./SelectFlags.jsx"
import Dropdown from "./Dropdown.jsx"

// remember to add delimeters

const languages = [
    {
        text: "Python",
        value: "Python",
    },
    {
        text: "Golang",
        value: "Golang",
    },
    {
        text: "Javascript",
        value: "Javascript",
    },
    {
        text: "Java",
        value: "Java",
    },
]

function RegexComponent({
    matchCount,
    regex,
    handleRegexChange,
    setLanguage,
    text,
    currentLang,
    getFlags,
}) {
    const [onHoverActive, setOnHoverActive] = useState(false)
    const [flags, setFlags] = useState("gm")
    const [copiedText, setCopiedText] = useState(false)

    const PythonCode = `import re
txt = """${text}"""
pattern = r"${regex}"
flag_string = "${flags}"
regex = re.compile(pattern, sum(getattr(re, flag.upper()) for flag in flag_string if flag in "imsluxa"))
matches = regex.findall(txt)
print("Matches:", matches)`

    const GolangCode = `package main
import (
    "fmt"
    "regexp"
    "strings"
)

func main() {
    text := \`${text}\`
    regexPattern := \`${regex}\`
    flagString := "${flags}"
    allowedFlags := "imsuxU"

    commonFlags := ""
    
    for _, char := range allowedFlags {
        if strings.ContainsRune(flagString, char) {
            commonFlags += string(char)
        }
    }
    regex := regexp.MustCompile("(?" + commonFlags + ")" + regexPattern)
    matches := regex.FindAllString(text, -1)

    fmt.Println("Matches:", matches)
}`

    const jsCode = `const flags = "${flags}";
const pattern = "${regex}"
const regexPattern = new RegExp(pattern, flags);
const text =\`${text}\`;
const result = text.match(regexPattern);
console.log("Matches:", result);`

    const javaCode = `import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        String text = """\n${text}""";
        String regexPattern = "${regex}"; 
        String flagString = "${flags}"; 

        StringBuilder flags = new StringBuilder();
        
        for (char flag : flagString.toCharArray()) {
            if ("imsux".indexOf(flag) != -1) {
                flags.append(flag);
            }
        }

        Pattern pattern = Pattern.compile("(?"+flags+")" + regexPattern, getFlags(flags.toString()));
        Matcher matcher = pattern.matcher(text);

        List<String> matches = new ArrayList<>();
        while (matcher.find()) {
            matches.add(matcher.group());
        }

        System.out.println("Matches: " + matches);
    }

    private static int getFlags(String flags) {
        int result = 0;
        if (flags.contains("i")) {
            result |= Pattern.CASE_INSENSITIVE;
        }
        if (flags.contains("m")) {
            result |= Pattern.MULTILINE;
        }
        if (flags.contains("s")) {
            result |= Pattern.DOTALL;
        }
        if (flags.contains("u")) {
            result |= Pattern.UNICODE_CASE;
        }
        if (flags.contains("x")) {
            result |= Pattern.COMMENTS;
        }
        return result;
    }
}`

    const codeSnippets = {
        Python: PythonCode,
        Golang: GolangCode,
        Javascript: jsCode,
        Java: javaCode,
    }

    const copyBtnRef = useRef(null)

    const copyToClipboard = (copyBtnRef) => {
        if (!navigator.clipboard) {
            // Fallback for older browsers (e.g., Internet Explorer)
            const textarea = document.createElement("textarea")
            textarea.value = codeSnippets[currentLang]
            textarea.style.position = "fixed"
            textarea.style.opacity = 0
            copyBtnRef.current.appendChild(textarea)
            textarea.select()
            document.execCommand("copy")
            copyBtnRef.current.removeChild(textarea)
            return
        }
        navigator.clipboard.writeText(codeSnippets[currentLang])
        setCopiedText(true)
        setTimeout(() => {
            setCopiedText(false)
        }, 2000)
    }

    const handleMouseOver = () => {
        setOnHoverActive(true)
    }
    const handleMouseLeave = () => {
        setOnHoverActive(false)
    }

    useEffect(() => {
        let timeoutId
        if (copiedText) {
            timeoutId = setTimeout(() => {
                setCopiedText(false)
            }, 2000)
        }
        return () => clearTimeout(timeoutId)
    }, [copiedText])

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label
                    htmlFor="regexInput"
                    style={{ display: "flex", alignItems: "center" }}
                >
                    Regular expression:
                </label>
                <div
                    style={
                        matchCount === 0
                            ? {
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  background: "#F6F6F7",
                                  fontSize: "12px",
                              }
                            : {
                                  background: "#AEE9D1",
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                              }
                    }
                >
                    {matchCount <= 1
                        ? `${matchCount} match`
                        : `${matchCount} matches`}
                </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
                <Dropdown
                    options={languages}
                    onSelect={setLanguage}
                    optionName={"languages"}
                    defaultValue={{ text: currentLang, value: currentLang }}
                />
                <div
                    style={{
                        flex: 2,
                        display: "flex",
                        border: "1px solid #AEB4B9",
                        borderRadius: "4px",
                        gap: "8px",
                    }}
                >
                    <div
                        style={{
                            padding: "8px",
                            paddingRight: "0px",
                            color: "#B7BCC0",
                        }}
                    >
                        /
                    </div>
                    <input
                        type="text"
                        id="regexInput"
                        value={regex}
                        placeholder="Enter a regex pattern"
                        onChange={handleRegexChange}
                        style={{
                            width: "100%",
                            padding: "8px 12px 8px 0",
                            border: "none",
                            outline: "none",
                        }}
                    />
                    <SelectFlags getFlags={getFlags} />
                    <div
                        ref={copyBtnRef}
                        onClick={copyToClipboard}
                        style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 12px",
                            borderLeft: "1px solid #AEB4B9",
                        }}
                        onMouseEnter={handleMouseOver}
                        onMouseLeave={handleMouseLeave}
                    >
                        <i
                            class="fa fa-file fa-2x"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                        ></i>
                        {onHoverActive ? (
                            <div
                                className="Polaris-PositionedOverlay Polaris-Card"
                                style={{
                                    transform: `translate(-30px, -35px)`,
                                    padding: "8px",
                                    position: "absolute",
                                }}
                            >
                                {!copiedText ? "Copy to clipboard" : "Copied!!"}{" "}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegexComponent
