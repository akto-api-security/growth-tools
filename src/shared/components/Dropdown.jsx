import React, { useState } from "react"
import Button from "./Button.jsx"

const Dropdown = ({ options, onSelect, optionName, defaultValue }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(
        defaultValue ||
            options[0] || { text: "Select any " + optionName, value: "" }
    )
    const toggleDropdown = (e) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
    }

    window.addEventListener("click", function () {
        setIsOpen(false)
    })

    return (
        <div className="dropdown">
            <Button
                buttonText={selectedOption.text}
                onClick={toggleDropdown}
                isDropdown={true}
            />
            {isOpen ? (
                <div className="Polaris-PositionedOverlay">
                    <ul
                        className="Polaris-Card"
                        style={{
                            listStyleType: "none",
                            padding: "inherit",
                            margin: "inherit",
                        }}
                    >
                        {options.map((option, index) => {
                            return (
                                <li
                                    style={{
                                        padding: "4px",
                                        cursor: "pointer",
                                        ...(selectedOption.text === option.text
                                            ? {
                                                  borderLeft:
                                                      "3px solid #0094d5",
                                                  borderRadius: "4px",
                                              }
                                            : {}),
                                    }}
                                    onClick={(e) => {
                                        setSelectedOption(option)
                                        onSelect(option)
                                        toggleDropdown(e)
                                    }}
                                    key={index}
                                >
                                    <div
                                        style={{
                                            padding: "4px 8px",
                                            fontSize: "14px",
                                            borderRadius: "4px",
                                            ...(selectedOption.text ===
                                            option.text
                                                ? { background: "#f7f7f7" }
                                                : {}),
                                        }}
                                    >
                                        {option.text}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ) : null}
        </div>
    )
}

export default Dropdown
