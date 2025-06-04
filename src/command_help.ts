import { getCommands } from "./commands.js";
import { type State } from "./state.js"

export async function commandHelp(state: State) {
    console.log("Welcome to the Pokedex!");
    console.log("usage:");
    const commands = getCommands()
    for (const command in state.commands) {
        console.log(`${commands[command].name}: ${commands[command].description}`)
    };
};