import { cn, type CnOptions } from "tailwind-variants"

export const tvcn = (...options: CnOptions) => cn(...options)({ twMerge: true })
