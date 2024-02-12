import React from "react"

function Button({ onClick, isDropdown, isPrimary, buttonText }) {
    return (
        <div
            className="Polaris-Button"
            onClick={onClick}
            style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
                height: "36px",
                padding: "8px",
                gap: "8px",
                ...(isPrimary
                    ? { background: "#6200EA", color: "#ffffff" }
                    : {}),
            }}
        >
            {buttonText}
            {isDropdown ? <i className="fa fa-caret-down" /> : null}
        </div>
    )
}
export default Button
