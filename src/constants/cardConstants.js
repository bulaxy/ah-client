export const ALL = {
    factionCode: undefined,
    factionName: 'All',
    img: require("../resources/icons/all.png")
}

export const GUARDIAN = {
    factionCode: 'guardian',
    factionName: 'Guardian',
    img: require("../resources/icons/guardian.png")
}

export const MYSTIC = {
    factionCode: 'mystic',
    factionName: 'Mystic',
    img: require("../resources/icons/mystic.png")
}

export const ROGUE = {
    factionCode: 'rogue',
    factionName: 'Rogue',
    img: require("../resources/icons/rogue.png")
}

export const SEEKER = {
    factionCode: 'seeker',
    factionName: 'Seeker',
    img: require("../resources/icons/seeker.png")
}

export const SURVIVOR = {
    factionCode: 'survivor',
    factionName: 'Survivor',
    img: require("../resources/icons/survivor.png")
}

export const NEUTRAL = {
    factionCode: 'neutral',
    factionName: 'Neutral',
    img: require("../resources/icons/neutral.png")
}

export const FILTERABLE_STRING_KEY = [
    "flavor",
    "name",
    "text",
    "subname",
    "backText",
    "backFlavor",
]

export const FILTERABLE_BOOLEAN_KEY = [
    "permanent",
    "myriad",
    "exceptional",
    "isUnique",
    "exile",
    "hidden",
    "doubleSided",
    "bondedTo",
    "healthPerInvestigator",
]

export const FILTERABLE_NUMBER_KEY = [
    "health",
    "sanity",
    "quantity",
    "skillWillpower",
    "skillIntellect",
    "skillCombat",
    "skillAgility",
    "skillWild",
    "victory",
    "enemyDamage",
    "enemyHorror",
    "enemyFight",
    "enemyEvade",
    "shroud",
    "clues",
    "xp",
    "cost",
    "deckLimit",
]

export const FILTERABLE_SELECTABLE_KEY = [
    "packName",
    "factionName",
    "slot",
    "realSlot",
    "illustrator",
    "typeName",
    "subtypeName",
    "traits",
    "realTraits",
]

// "faction2Code",
// "faction2Name",
// "faction3Code",
// "faction3Name",
// "alternateOfCode",
// "alternateOfName"
//Select

export const FILTERABLE_KEY_OPTIONS = [
    { label: "packCode", value: "packCode", key: "packCode", type: "" },
    { label: "packName", value: "packName", key: "packName", type: "options" },
    { label: "typeCode", value: "typeCode", key: "typeCode", type: "" },
    { label: "typeName", value: "typeName", key: "typeName", type: "options" },
    { label: "subtypeCode", value: "subtypeCode", key: "subtypeCode", type: "" },
    { label: "subtypeName", value: "subtypeName", key: "subtypeName", type: "options" },
    { label: "factionCode", value: "factionCode", key: "factionCode", type: "" },
    { label: "factionName", value: "factionName", key: "factionName", type: "options" },
    { label: "position", value: "position", key: "position", type: "number" },
    { label: "exceptional", value: "exceptional", key: "exceptional", type: "boolean" },
    { label: "myriad", value: "myriad", key: "myriad", type: "boolean" },
    { label: "code", value: "code", key: "code", type: "string" },
    { label: "name", value: "name", key: "name", type: "string" },
    { label: "realName", value: "realName", key: "realName", type: "" },
    { label: "text", value: "text", key: "text", type: "string" },
    { label: "realText", value: "realText", key: "realText", type: "" },
    { label: "quantity", value: "quantity", key: "quantity", type: "number" },
    { label: "healthPerInvestigator", value: "healthPerInvestigator", key: "healthPerInvestigator", type: "boolean" },
    { label: "deckLimit", value: "deckLimit", key: "deckLimit", type: "" },
    { label: "realSlot", value: "realSlot", key: "realSlot", type: "" },
    { label: "traits", value: "traits", key: "traits", type: "options", splitter: '.' },
    { label: "realTraits", value: "realTraits", key: "realTraits", type: "" },
    { label: "isUnique", value: "isUnique", key: "isUnique", type: "boolean" },
    { label: "hidden", value: "hidden", key: "hidden", type: "boolean" },
    { label: "permanent", value: "permanent", key: "permanent", type: "boolean" },
    { label: "doubleSided", value: "doubleSided", key: "doubleSided", type: "boolean" },
    { label: "url", value: "url", key: "url", type: "" },
    { label: "subname", value: "subname", key: "subname", type: "string" },
    { label: "skillWillpower", value: "skillWillpower", key: "skillWillpower", type: "number" },
    { label: "skillIntellect", value: "skillIntellect", key: "skillIntellect", type: "number" },
    { label: "skillCombat", value: "skillCombat", key: "skillCombat", type: "number" },
    { label: "skillAgility", value: "skillAgility", key: "skillAgility", type: "number" },
    { label: "health", value: "health", key: "health", type: "number" },
    { label: "sanity", value: "sanity", key: "sanity", type: "number" },
    { label: "deckRequirements", value: "deckRequirements", key: "deckRequirements", type: "" },
    { label: "deckOptions", value: "deckOptions", key: "deckOptions", type: "" },
    { label: "flavor", value: "flavor", key: "flavor", type: "string" },
    { label: "illustrator", value: "illustrator", key: "illustrator", type: "string" },
    { label: "backText", value: "backText", key: "backText", type: "string" },
    { label: "backFlavor", value: "backFlavor", key: "backFlavor", type: "string" },
    { label: "octgnId", value: "octgnId", key: "octgnId", type: "" },
    { label: "imagesrc", value: "imagesrc", key: "imagesrc", type: "" },
    { label: "backimagesrc", value: "backimagesrc", key: "backimagesrc", type: "" },
    { label: "cost", value: "cost", key: "cost", type: "number" },
    { label: "errataDate", value: "errataDate", key: "errataDate", type: "" },
    { label: "skillWild", value: "skillWild", key: "skillWild", type: "number" },
    { label: "slot", value: "slot", key: "slot", type: "string" },
    { label: "restrictions", value: "restrictions", key: "restrictions", type: "" },
    { label: "xp", value: "xp", key: "xp", type: "number" },
    { label: "duplicatedBy", value: "duplicatedBy", key: "duplicatedBy", type: "" },
    { label: "enemyDamage", value: "enemyDamage", key: "enemyDamage", type: "number" },
    { label: "enemyHorror", value: "enemyHorror", key: "enemyHorror", type: "number" },
    { label: "enemyFight", value: "enemyFight", key: "enemyFight", type: "number" },
    { label: "enemyEvade", value: "enemyEvade", key: "enemyEvade", type: "number" },
    { label: "duplicateOfCode", value: "duplicateOfCode", key: "duplicateOfCode", type: "" },
    { label: "duplicateOfName", value: "duplicateOfName", key: "duplicateOfName", type: "" },
    { label: "victory", value: "victory", key: "victory", type: "number" },
    { label: "exile", value: "exile", key: "exile", type: "boolean" },
    { label: "linkedToCode", value: "linkedToCode", key: "linkedToCode", type: "" },
    { label: "linkedToName", value: "linkedToName", key: "linkedToName", type: "" },
    { label: "linkedCard", value: "linkedCard", key: "linkedCard", type: "" },
    { label: "faction2Code", value: "faction2Code", key: "faction2Code", type: "" },
    { label: "faction2Name", value: "faction2Name", key: "faction2Name", type: "" },
    { label: "bondedCards", value: "bondedCards", key: "bondedCards", type: "" },
    { label: "bondedTo", value: "bondedTo", key: "bondedTo", type: "" },
    { label: "bondedCount", value: "bondedCount", key: "bondedCount", type: "" },
    { label: "shroud", value: "shroud", key: "shroud", type: "number" },
    { label: "clues", value: "clues", key: "clues", type: "number" },
    { label: "faction3Code", value: "faction3Code", key: "faction3Code", type: "" },
    { label: "faction3Name", value: "faction3Name", key: "faction3Name", type: "" },
    { label: "alternateOfCode", value: "alternateOfCode", key: "alternateOfCode", type: "" },
    { label: "alternateOfName", value: "alternateOfName", key: "alternateOfName", type: "" }
]

export const ALL_KEYS = [
    "packCode",
    "packName",
    "typeCode",
    "typeName",
    "subtypeCode",
    "subtypeName",
    "factionCode",
    "factionName",
    "position",
    "exceptional",
    "myriad",
    "code",
    "name",
    "realName",
    "text",
    "realText",
    "quantity",
    "healthPerInvestigator",
    "deckLimit",
    "realSlot",
    "traits",
    "realTraits",
    "isUnique",
    "hidden",
    "permanent",
    "doubleSided",
    "url",
    "subname",
    "skillWillpower",
    "skillIntellect",
    "skillCombat",
    "skillAgility",
    "health",
    "sanity",
    "deckRequirements",
    "deckOptions",
    "flavor",
    "illustrator",
    "backText",
    "backFlavor",
    "octgnId",
    "imagesrc",
    "backimagesrc",
    "cost",
    "errataDate",
    "skillWild",
    "slot",
    "restrictions",
    "xp",
    "duplicatedBy",
    "enemyDamage",
    "enemyHorror",
    "enemyFight",
    "enemyEvade",
    "duplicateOfCode",
    "duplicateOfName",
    "victory",
    "exile",
    "linkedToCode",
    "linkedToName",
    "linkedCard",
    "faction2Code",
    "faction2Name",
    "bondedCards",
    "bondedTo",
    "bondedCount",
    "shroud",
    "clues",
    "faction3Code",
    "faction3Name",
    "alternateOfCode",
    "alternateOfName"
]

export const FACTION_LIST = [
    ALL,
    GUARDIAN,
    MYSTIC,
    ROGUE,
    SEEKER,
    SURVIVOR,
    NEUTRAL
]