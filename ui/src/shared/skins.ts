import { tv } from "tailwind-variants"

export const phonePage = tv({
  base: `
    flex flex-col max-w-120 mx-auto
    w-full h-dvh bg-gray-50
  `,
})

export const desktopPage = tv({
  base: `
    flex flex-col mx-auto
    w-full max-w-400 h-dvh bg-gray-50
  `,
})

export const list = tv({
  base: "p-4 gap-4 flex flex-col flex-1 overflow-y-auto",
})

export const iconBtn = tv({
  base: `
    flex flex-col items-center justify-center rounded-md
    cursor-pointer disabled:cursor-not-allowed
    text-gray-600 hover:text-gray-900 disabled:hover:text-gray-600
    bg-transparent hover:bg-gray-200 disabled:hover:bg-transparent
    active:scale-95 disabled:active:scale-100
    disabled:opacity-50
  `,
  variants: {
    size: {
      8: `size-8 text-xs [&_svg]:text-[1.5em]`,
      12: `size-12 text-base [&_svg]:text-[1.5em]`,
    },
  },
  defaultVariants: {
    size: 12,
  },
})

export const paginationIconBtn = tv({
  base: `
    size-8 [&_svg]:text-[1.33em] flex flex-col text-xs
    items-center justify-center rounded-md
    cursor-pointer disabled:cursor-not-allowed
    text-gray-600 hover:text-gray-900 disabled:hover:text-gray-600
    bg-transparent hover:bg-gray-200 disabled:hover:bg-transparent
    active:scale-95 disabled:active:scale-100
    disabled:opacity-50
  `,
})

export const linkBtn = tv({
  base: `
    underline 
    text-gray-600 hover:text-gray-900 disabled:hover:text-gray-600
    cursor-pointer disabled:cursor-not-allowed
  `,
})

export const btn = tv({
  base: `
    flex items-center justify-center
    [&_svg]:text-[1.3em]

    disabled:opacity-50
    disabled:grayscale-100

    active:scale-95 disabled:active:scale-100
    cursor-pointer  disabled:cursor-not-allowed
  `,
  variants: {
    size: {
      md: `min-h-12 gap-2 px-4 rounded-md`,
    },
    theme: {
      "contained-primary": `
        bg-indigo-600
        hover:bg-indigo-700 
        disabled:hover:bg-indigo-600

        text-gray-50
      `,
    },
  },
  defaultVariants: {
    size: "md",
    theme: "contained-primary",
  },
})
