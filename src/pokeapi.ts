import { Cache } from "./pokecache.js"



export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor(cacheInterval: number) {
        this.cache = new Cache(cacheInterval);
    }

    stopCache() {
        this.cache.stopReapLoop();
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL || `${PokeAPI.baseURL}/location-area/`;

        const cached = this.cache.get<ShallowLocations>(url);
        if (cached) {
            return cached;
        }
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }
            const locations: ShallowLocations = await resp.json()
            this.cache.add(url, locations);
            return locations;
        } catch (e) {
            throw new Error(`Error fetching locaations ${(e as Error).message}`)
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const cached = this.cache.get<Location>(url);
        if (cached) {
            return cached;
        }
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }
            const location: Location = await resp.json();
            this.cache.add(url, location)
            return location;
        } catch (e) {
            throw new Error(`Error fetching location ${(e as Error).message}`)
        };
    }

    async catchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        const cached = this.cache.get<Pokemon>(url);
        if (cached) {
            return cached;
        }
        try {
            const resp = await fetch(url)
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }
            const pokemon = resp.json();
            this.cache.add(url, pokemon)
            return pokemon;
        } catch (e) {
            throw new Error(`Error finding pokemon ${(e as Error).message}`)
        }
    }
}

export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    is_default: boolean;
    order: number;
    species: {
        name: string;
        url: string;
    };
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    abilities: {
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }[];
    moves: {
        move: {
            name: string;
            url: string;
        };
        version_group_details: {
            level_learned_at: number;
            move_learn_method: {
                name: string;
                url: string;
            };
            version_group: {
                name: string;
                url: string;
            };
        }[];
    }[];
    held_items: {
        item: {
            name: string;
            url: string;
        };
        version_details: {
            rarity: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
    game_indices: {
        game_index: number;
        version: {
            name: string;
            url: string;
        };
    }[];
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    location_area_encounters: string;
    forms: {
        name: string;
        url: string;
    }[];
    sprites: {
        official_artwork: string;
        shiny: string;
    };
    cries: {
        latest: string;
        legacy: string;
    };
};

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
};

export type Location = {
    encounter_method_rates: {
        encounter_method: {
            name: string;
            url: string;
        };
        version_details: {
            rate: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
    game_index: number;
    id: number;
    location: {
        name: string;
        url: string;
    };
    name: string;
    names: {
        language: {
            name: string;
            url: string;
        };
        name: string;
    }[];
    pokemon_encounters: {
        pokemon: {
            name: string;
            url: string;
        };
        version_details: {
            encounter_details: {
                chance: number;
                condition_values: any[];
                max_level: number;
                method: {
                    name: string;
                    url: string;
                };
                min_level: number;
            }[];
            max_chance: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
};
