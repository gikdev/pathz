// @ts-check

import { concurrently } from "concurrently"

concurrently([
  {
    command: "npm run dev",
    cwd: "server",
    name: "SERVER",
    prefixColor: "cyan",
  },
  {
    command: "npm run dev",
    cwd: "client",
    name: "CLIENT",
    prefixColor: "green",
  },
])
