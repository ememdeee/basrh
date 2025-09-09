import { PrismicNextLink } from "@prismicio/next"
import { MdArrowOutward } from "react-icons/md"
import clsx from "clsx"
import type { KeyTextField, LinkField } from "@prismicio/client"

type ButtonProps = {
  linkField: LinkField
  label: KeyTextField
  showIcon?: boolean
  className?: string
  style?: "primary" | "primary-big"
}

export default function Button({ linkField, label, showIcon = true, className, style = "primary" }: ButtonProps) {
  return (
    <PrismicNextLink
      field={linkField}
      className={clsx(
        "group text-slate-800 relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 font-bold transition-transform ease-out hover:scale-105",
        {
          "px-4 py-2": style === "primary",
          "px-12 py-6 text-xl": style === "primary-big",
        },
        className,
      )}
    >
      <span
        className={clsx(
          "absolute inset-0 z-0 h-full bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
          {
            "translate-y-9": style === "primary",
            "translate-y-[69px]": style === "primary-big",
          },
        )}
      />
      <span className="relative flex items-center justify-center gap-2">
        {label}{" "}
        {showIcon && (
          <MdArrowOutward
            className={clsx("inline-block", {
              "text-2xl": style === "primary-big",
            })}
          />
        )}
      </span>
    </PrismicNextLink>
  )
}
