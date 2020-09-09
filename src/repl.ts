import { terminal } from "terminal-kit"
import type { Context } from "bx-lang/dist/core"

const options = {
    history: [] as string[],
    cancelable: true,
    keyBindings: {
        CTRL_C: "cancel",
        CTRL_D: "cancel",
        ENTER: "submit",
        KP_ENTER: "submit",
        BACKSPACE: "backDelete",
        DELETE: "delete",
        LEFT: "backward",
        RIGHT: "forward",
        UP: "historyPrevius",
        DOWN: "historyNext",
    },
}

async function repl(ctx: Context) {
    terminal("> ")
    const input = await terminal.inputField(options).promise
    if (input === undefined) {
        console.log("\nbye")
        process.exit()
    }
    options.history.push(input)
    terminal("\n")
    try {
        const res = ctx.core.eval(input, ctx)
        console.log("=", res.toString())
    } catch (e) {
        console.log("!", e.toString())
    }
    repl(ctx)
}

export function startRepl(ctx: Context) {
    console.log("Blocks " + process.env.npm_package_version)
    repl(ctx)
}
