import { cva } from "./cva"

export const phonePage = cva({
  base: `
    flex flex-col max-w-120 mx-auto
    w-full h-dvh bg-zinc-50
  `,
})

export const desktopPage = cva({
  base: `
    flex flex-col max-w-400 mx-auto
    w-full h-dvh bg-zinc-50
  `,
})

export const list = cva({
  base: "p-4 gap-4 flex flex-col flex-1 overflow-y-auto",
})

export const appBarIconBtn = cva({
  base: `
    size-12 [&_svg]:text-[1.5em] flex flex-col
    items-center justify-center rounded-md
    cursor-pointer disabled:cursor-not-allowed
    text-zinc-600 hover:text-zinc-900 disabled:hover:text-zinc-600
    bg-transparent hover:bg-zinc-200 disabled:hover:bg-transparent
    active:scale-95 disabled:active:scale-100
    disabled:opacity-50
  `,
})

export const linkBtn = cva({
  base: `
    underline 
    text-zinc-600 hover:text-zinc-900 disabled:hover:text-zinc-600
    cursor-pointer disabled:cursor-not-allowed
  `,
})
