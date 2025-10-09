// @ts-check

import { concurrently } from "concurrently"

concurrently([
  {
    command: "npm run dev",
    cwd: "server",
    name: " SERVER ",
    prefixColor: "green",
  },
  {
    command: "npm run dev",
    cwd: "ui",
    name: "   UI   ",
    prefixColor: "cyan",
  },
])
