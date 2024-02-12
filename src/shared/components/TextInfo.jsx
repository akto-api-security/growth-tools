import React from "react"

function TextInfo({ textInfo, emptyText, totalOpen }) {
    function ConvertToHtml({ text, title }) {
        if (text.includes("<")) {
            text = `<b style={{fontSize: '12px'}}>"${title}" : </b>` + text
            return (
                <div
                    dangerouslySetInnerHTML={{ __html: text }}
                    style={{ fontSize: "12px" }}
                ></div>
            )
        }
        return (
            <>
                <span
                    style={{
                        fontWeight: "bold",
                        fontSize: "12px",
                        width: "60px",
                    }}
                >
                    {title}&nbsp;
                </span>
                <span
                    className="text-container"
                    style={{
                        width: "230px",
                        textOverflow: "ellipsis",
                        overflowX: "hidden",
                        fontSize: "12px",
                    }}
                >
                    {text}
                </span>
            </>
        )
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {textInfo.map((obj, index) => (
                <li key={index} style={{ display: "flex", gap: "4px" }}>
                    <ConvertToHtml text={obj.value} title={obj.title} />
                </li>
            ))}
            {textInfo.length === 0 && (
                <div style={{ fontSize: "12px" }}>{emptyText}</div>
            )}
        </div>
    )
}

export default TextInfo
