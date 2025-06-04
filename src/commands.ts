import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { CLICommand } from "./state.js";
import { commandMapBackword, commandMapForword } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInsepect } from "./command_Inspect.js";
import { commandPokedex } from "./command_pokedex.js";


export function getCommands(): Record<string, CLICommand> {
    return {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp
        },
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit
        },
        map: {
            name: "map",
            description: "Get the next page of locations",
            callback: commandMapForword
        },
        mapb: {
            name: "mapb",
            description: "Get the previous page of locations",
            callback: commandMapBackword
        },
        explore: {
            name: "explore",
            description: "Get a list of Pokimems in a given area",
            callback: commandExplore
        },
        catch: {
            name: "Catch a Pokemon",
            description: "Throw a PokeBall to catch a Pokemon",
            callback: commandCatch
        },
        inspect: {
            name: "Inspect caught pokemon",
            description: " inspect caught pokemon",
            callback: commandInsepect
        },
        pokedex: {
            name: "Pokedex",
            description: "Get all the catched Pokemons",
            callback: commandPokedex
        }
    }
};


