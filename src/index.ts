#!/usr/bin/env node
import { readFileSync } from "fs"
import { usage } from "yargs"
import { Blocks } from "bx-lang"
import { Context } from "bx-lang/dist/core"
import { Scope } from "bx-lang/dist/engine/scope"
import { startRepl } from "./repl"

const usageMsg = "Usage: [file-name]"
const args = usage(usageMsg).argv._

if (args.length === 0) {
    const core = new Blocks()
    const replCtx: Context = { scope: new Scope(core.globalScope), core }
    startRepl(replCtx)
} else if (args.length === 1) {
    const core = new Blocks()
    core.eval(readFileSync(args[0], { encoding: "utf-8" }))
} else {
    console.log(usageMsg)
}
