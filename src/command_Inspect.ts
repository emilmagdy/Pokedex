import { State } from "./state.js"

export async function commandInsepect(state: State, ...args: string[]) {
    if (args.length !== 1) {
        console.log("You must provide a Pokemon to inpect")
    }
    const name = args[0];
    const pokemon = state.pokedex[name];
    if (pokemon) {
        console.log(`Name: ${pokemon.name}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Wieght: ${pokemon.weight}`);
        console.log(`stats:`)
        for (const stat of pokemon.stats)
            console.log(` -${stat.stat.name}: ${stat.base_stat}`)
        console.log(`types: `)
        for (const type of pokemon.types)
            console.log(` -${type.type.name}`)
        return;
    }
    console.log("You have not caught that pokemon");
}