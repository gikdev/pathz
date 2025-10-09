// @ts-check

import { concurrently } from "concurrently"

concurrently([
  {
    command: "npm run build",
    cwd: "server",
    name: " SERVER ",
    prefixColor: "green",
  },
  {
    command: "npm run build",
    cwd: "ui",
    name: "   UI   ",
    prefixColor: "cyan",
  },
])
