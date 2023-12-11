export function getTruthyKeys(obj) {
    if (typeof obj !== 'object') {
        return []
    }

    const value = {}
    const entries = Object.entries(obj)
    for (const [key, val] of entries) {
        if (val) {
            value[key] = val._name || key
        }
    }
    const keys = Object.keys(value)
    // const filtered = entries.filter(([key, val]) => val)
    // const value = filtered.map(([key, val]) => ({[key]: val._name}))
    return {
        value,
        keys,
        names: Object.values(value),
        length: keys.length
    }
}


export function unique(list) {
    return Array.from(new Set(list));
}