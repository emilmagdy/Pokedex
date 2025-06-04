import { State } from "./state.js";

export async function commandMapForword(state: State) {
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;

    for (const loc of locations.results) {
        console.log(loc.name);
    };
}

export async function commandMapBackword(state: State) {
    if (!state.prevLocationsURL) {
        console.log("You are in the first page")
    }
    const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    for (const loc of locations.results) {
        console.log(loc.name);
    }
}

