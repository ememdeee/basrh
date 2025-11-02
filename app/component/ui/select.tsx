"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  name?: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  options: SelectOption[]
  required?: boolean
  disabled?: boolean
}

export default function Select({
  name,
  value,
  onChange,
  placeholder = "Select an option",
  options,
  required = false,
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || "")
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedLabel = options.find((opt) => opt.value === selectedValue)?.label

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    onChange?.(optionValue)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={selectedValue} />

      {/* Main Select Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground
          flex items-center justify-between gap-2
          transition-all duration-200 ease-out
          ${isOpen ? "ring-2 ring-ring border-ring" : ""}
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-ring/50 cursor-pointer"}
          ${!selectedValue ? "text-muted-foreground" : ""}
        `}
      >
        <span className={selectedValue ? "text-foreground" : "text-muted-foreground"}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown size={18} className={`transition-transform duration-100 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`
            absolute top-full left-0 right-0 mt-2 z-50
            border border-border rounded-lg shadow-lg
            overflow-hidden
            fade-in-fast bg-slate-900
          `}
        >
          <div className="max-h-60 overflow-y-auto">
            {/* Placeholder option if not required */}
            {!required && (
              <button
                type="button"
                onClick={() => handleSelect("")}
                className="w-full px-4 py-2 text-left text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-100"
              >
                {placeholder}
              </button>
            )}

            {/* Options */}
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full px-4 py-2 text-left transition-colors duration-100
                  ${
                    selectedValue === option.value
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
