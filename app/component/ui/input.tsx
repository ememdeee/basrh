"use client"

import type React from "react"

import { useState, useRef } from "react"

type InputType = "text" | "email" | "tel" | "textarea"

interface InputProps {
  name?: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  type?: InputType
  required?: boolean
  disabled?: boolean
  rows?: number
  label?: string
  maxLength?: number
}

export default function Input({
  name,
  value: initialValue = "",
  onChange,
  placeholder = "Enter text",
  type = "text",
  required = false,
  disabled = false,
  rows = 4,
  label,
  maxLength,
}: InputProps) {
  const [value, setValue] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let newValue = e.target.value

    if (type === "tel") {
      newValue = newValue.replace(/[^\d+\-() ]/g, "")
    }

    setValue(newValue)
    onChange?.(newValue)
  }

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  const displayValue = value
  const hasValue = displayValue.length > 0
  const showLabel = hasValue || isFocused

  const showPlaceholder = isFocused && label

  const baseInputClasses = `
    w-full px-4 py-3 rounded-lg border border-border bg-transparent text-foreground
    transition-all duration-200 ease-out
    ${isFocused ? "ring-2 ring-ring border-ring" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-ring/50"}
    ${required && !hasValue && !isFocused ? "ring-1 ring-destructive/30" : ""}
    focus:outline-none
  `

  return (
    <div className="relative w-full">
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} required={required} data-required={required} />

      {/* Floating Label with solid background and proper positioning */}
      {label && (
        <label
          className={`
            absolute left-4 bg-background text-sm font-medium px-2
            transition-all duration-300 ease-out pointer-events-none
            ${
              showLabel
                ? "-top-2.5 text-ring scale-90 opacity-100 before:content-[''] before:absolute before:inset-x-0 before:top-[40%] before:h-[5px] before:bg-slate-900 before:-z-10" // Always moves to top with background
                : type === "textarea"
                  ? "top-3 text-muted-foreground scale-100 opacity-75" // Textarea label starts at top, not centered
                  : "top-1/2 -translate-y-1/2 text-muted-foreground scale-100 opacity-75" // Text inputs centered initially
            }
          `}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Input Field */}
      {type === "textarea" ? (
        <textarea
          ref={inputRef as React.Ref<HTMLTextAreaElement>}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={showPlaceholder ? placeholder : ""}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          required={required}
          className={`${baseInputClasses} resize-none placeholder-muted-foreground/60`}
        />
      ) : (
        <input
          ref={inputRef as React.Ref<HTMLInputElement>}
          type={type === "email" ? "email" : type === "tel" ? "tel" : "text"}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={showPlaceholder ? placeholder : ""}
          disabled={disabled}
          maxLength={maxLength || (type === "tel" ? 20 : undefined)}
          required={required}
          className={`${baseInputClasses} placeholder-muted-foreground/60`}
        />
      )}

      {/* Character count for textarea */}
      {type === "textarea" && maxLength && (
        <div className="absolute bottom-3 right-4 text-xs text-muted-foreground pointer-events-none">
          {value.length}/{maxLength}
        </div>
      )}

      {required && !hasValue && !isFocused && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-destructive text-xs">●</div>
      )}
    </div>
  )
}
