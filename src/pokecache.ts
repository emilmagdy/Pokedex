type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalID: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(val: number) {
        this.#interval = val;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T) {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val
        }
        this.#cache.set(key, entry);
    }

    get<T>(key: string) {
        const entry = this.#cache.get(key)
        if (entry !== undefined) {
            return entry.val as T;
        }
        return undefined
    }
    #reap() {
        const now = Date.now()
        for (const [key, value] of this.#cache.entries()) {
            if (now - value.createdAt > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }
    #startReapLoop() {
        this.#reapIntervalID = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }
    stopReapLoop() {
        if (this.#reapIntervalID) {
            clearInterval(this.#reapIntervalID);
            this.#reapIntervalID === undefined
        }
    }
}