import React from "react"

function CollapsibleComponent({
    isExpanded,
    onClickFunc,
    title,
    textComponent,
    maxHeight,
}) {
    const textHeight = `calc(${maxHeight} - 8px)`
    return (
        <div
            style={{
                height: isExpanded ? `${maxHeight}` : "",
                borderRadius: "4px",
            }}
        >
            <div
                style={{
                    background: "#f6f6f7",
                    fontWeight: 500,
                    padding: "12px",
                    justifyContent: "space-between",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    borderRadius: "4px",
                    ...(isExpanded
                        ? { padding: "12px", borderBottom: "1px solid #E2E1E5" }
                        : {}),
                }}
                onClick={onClickFunc}
            >
                <span
                    style={{
                        fontSize: "14px",
                        fontWeight: "600",
                    }}
                >
                    {title}
                </span>
                <div
                    style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                    }}
                >
                    <i
                        className="fa fa-angle-down"
                        style={{
                            margin: "auto",
                            ...(isExpanded
                                ? {
                                      transform: "rotate(180deg)",
                                      transition: "all 0.2s ease-in-out",
                                  }
                                : {}),
                        }}
                    />
                </div>
            </div>

            {isExpanded && (
                <>
                    <div
                        style={{
                            background: "#f6f6f7",
                            padding: "10px",
                            fontSize: "14px",
                            maxHeight: textHeight,
                            overflowY: "auto",
                        }}
                    >
                        {textComponent}
                    </div>
                </>
            )}
        </div>
    )
}

export default CollapsibleComponent
