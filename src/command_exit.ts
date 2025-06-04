import { PokeAPI } from "./pokeapi.js";
import { type State } from "./state.js"

export async function commandExit(state: State) {
    console.log("Closing the Pokedex... Goodbye!");
    state.readline.close();
    state.pokeAPI.stopCache()
    process.exit();
};