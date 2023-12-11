import fs from 'fs';

export function mkdirIfNotExist(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
        return true
    }
    return false
}

export function writeFileIfNotExist(path, content) {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, content);
        return true
    }
    return false
}
