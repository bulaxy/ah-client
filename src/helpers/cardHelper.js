import { capitalize } from "./general"

const getCardKey = (type) => {
    switch (type) {
        case 'horror':
            return 'sanity'
        case 'damage':
            return 'health'
        case 'combat':
        case 'intellect':
        case 'willpower':
        case 'agility':
            return 'skill' + capitalize(type)
        default:
            return type
    }
}

export {
    getCardKey
}

