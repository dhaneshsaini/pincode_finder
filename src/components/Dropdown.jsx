import React, { useRef, useEffect, useState } from "react"
import { GrFormDown, GrFormUp } from "react-icons/gr"

export default function Dropdown({ label, options, selected, onSelectedChange, className }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSelection = (option) => {
        onSelectedChange(option)
        setIsOpen(false)
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div ref={dropdownRef} className={`relative ${className}`} aria-label={label}>
            <div onClick={toggleDropdown} className="cursor-pointer flex items-center justify-between bg-white py-2 px-3">
                <span className="font-medium">{selected}</span>
                {isOpen ? <GrFormUp /> : <GrFormDown />}
            </div>
            {isOpen && (
                <div className="absolute max-h-72 overflow-y-auto bg-white w-full border shadow-md mt-1 z-10">
                    {options
                        .filter(option => option !== selected)
                        .map((option, index) => (
                            <div onClick={() => handleSelection(option)} key={index} className="cursor-pointer py-1 px-2 hover:bg-gray-200">
                                {option}
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}