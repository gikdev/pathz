import { tv } from "tailwind-variants"

export const input = tv({
  base: `
    px-4 py-3
    min-h-12 w-full
    focus:outline-none 
    border-2 border-gray-300 focus:border-indigo-500
    rounded-lg
  `,
  variants: {
    isMultiline: {
      false: null,
      true: "h-24 resize-y",
    },
  },
  defaultVariants: {
    isMultiline: false,
  },
})

export const fieldContainer = tv({
  base: `flex flex-col gap-1`,
})
