import React, { useEffect, useRef, useState } from "react"

function SelectFlags({ getFlags }) {
    const [optedFlags, setOptedFlags] = useState({ g: true, m: true })
    const orderedFlags = ["g", "i", "m", "s", "u", "y", "x", "U"]

    const FLAG_LABELS = {
        g: (
            <span style={{ fontSize: "14px" }}>
                <b style={{ color: "#6200EA" }}>g</b>lobal
            </span>
        ),
        i: (
            <span style={{ fontSize: "14px" }}>
                case <b style={{ color: "#6200EA" }}>i</b>nsensitive
            </span>
        ),
        m: (
            <span style={{ fontSize: "14px" }}>
                <b style={{ color: "#6200EA" }}>m</b>ultiline
            </span>
        ),
        s: (
            <span style={{ fontSize: "14px" }}>
                <b style={{ color: "#6200EA" }}>s</b>ingle line (dotall)
            </span>
        ),
        u: (
            <span style={{ fontSize: "14px" }}>
                <b style={{ color: "#6200EA" }}>u</b>nicode
            </span>
        ),
        x: (
            <span style={{ fontSize: "14px" }}>
                e<b style={{ color: "#6200EA" }}>x</b>tended
            </span>
        ),
        y: (
            <span style={{ fontSize: "14px" }}>
                stick<b style={{ color: "#6200EA" }}>y</b>
            </span>
        ),
        U: (
            <span style={{ fontSize: "14px" }}>
                <b style={{ color: "#6200EA" }}>U</b>ngreedy
            </span>
        ),
    }

    const formFlagString = (copyOptedFlags) => {
        let flagString = ""
        orderedFlags.forEach((flag) => {
            if (copyOptedFlags.hasOwnProperty(flag)) {
                flagString += flag
            }
        })
        return flagString
    }

    const openModal = (e) => {
        e.stopPropagation()
        setIsModalOpen(true)
    }

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleOption = (option) => {
        const copyOptedFlags = JSON.parse(JSON.stringify(optedFlags))
        if (copyOptedFlags.hasOwnProperty(option)) {
            delete copyOptedFlags[option]
        } else {
            copyOptedFlags[option] = true
        }
        closeModal()
        getFlags(formFlagString(copyOptedFlags))
        setOptedFlags(copyOptedFlags)
    }

    const showedString = formFlagString(optedFlags)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const modalRef = useRef(null)
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                closeModal()
            } else {
                openModal()
            }
        }

        if (isModalOpen) {
            document.addEventListener("click", handleOutsideClick)
        }
        return () => {
            document.removeEventListener("click", handleOutsideClick)
        }
    }, [isModalOpen, optedFlags])

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: 600, color: "#B7BCC0" }}>/ </span>
            <span
                style={{
                    fontWeight: 600,
                    color: "#2C6ECB",
                    fontSize: "14px",
                    cursor: "pointer",
                }}
                onClick={openModal}
            >
                {showedString}
            </span>
            {isModalOpen ? (
                <div
                    className="Polaris-PositionedOverlay"
                    ref={modalRef}
                    style={{ transform: "translateY(55%)" }}
                >
                    <ul
                        className="Polaris-Card"
                        style={{
                            listStyleType: "none",
                            padding: "4px 0",
                            margin: "inherit",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                padding: "8px",
                                marginBottom: "4px",
                                marginTop: "4px",
                            }}
                        >
                            Regex flags
                        </span>
                        {orderedFlags.map((option, index) => {
                            return (
                                <li
                                    style={{
                                        padding: "4px 8px",
                                        cursor: "pointer",
                                        marginBottom: "4px",
                                    }}
                                    onClick={() => handleOption(option)}
                                    key={index}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "8px",
                                            alignItems: "center",
                                        }}
                                    >
                                        {optedFlags[option] !== undefined ? (
                                            <i
                                                class="fa fa-check-square"
                                                style={{
                                                    color: "#2C6ECB",
                                                    marginTop: "2px",
                                                }}
                                            ></i>
                                        ) : (
                                            <i
                                                class="fa fa-square-o"
                                                aria-hidden="true"
                                                style={{ marginTop: "2px" }}
                                            ></i>
                                        )}
                                        {FLAG_LABELS[option]}
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

export default SelectFlags
