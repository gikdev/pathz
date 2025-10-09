// @ts-check

import { concurrently } from "concurrently"

concurrently([
  {
    command: "npm run build",
    cwd: "server",
    name: " SERVER ",
    prefixColor: "cyan",
  },
  {
    command: "npm run build",
    cwd: "ui",
    name: "   UI   ",
    prefixColor: "green",
  },
])
