// Unknown r,
// Free Card = t
// Unique = s

function SwitchText({ text, spanProps }) {
    switch (text) {
        case 'per_investigator':
            return <span {...{ ...spanProps, className: spanProps?.className + 'arkham-icons' }}>u</span>
        case 'mystic':
            return <span {...spanProps} className='arkham-icons'>g</span>
        case 'guardian':
            return <span {...spanProps} className='arkham-icons'>f</span>
        case 'seeker':
            return <span {...spanProps} className='arkham-icons'>h</span>
        case 'rogue':
            return <span {...spanProps} className='arkham-icons'>d</span>
        case 'survivor':
            return <span {...spanProps} className='arkham-icons'>e</span>
        case 'wild':
            return <span {...spanProps} className='arkham-icons'>?</span>
        case 'intellect':
            return <span {...spanProps} className='arkham-icons'>b</span>
        case 'combat':
            return <span {...spanProps} className='arkham-icons'>c</span>
        case 'willpower':
            return <span {...spanProps} className='arkham-icons'>p</span>
        case 'agility':
            return <span {...spanProps} className='arkham-icons'>a</span>
        case 'action':
            return <span {...spanProps} className='arkham-icons'>i</span>
        case 'free':
        case 'fast':
            return <span {...spanProps} className='arkham-icons'>j</span>
        case 'reaction':
            return <span {...spanProps} className='arkham-icons'>!</span>
        case 'elder_thing':
            return <span {...spanProps} className='arkham-icons'>n</span>
        case 'elder_sign':
            return <span {...spanProps} className='arkham-icons'>o</span>
        case 'skull':
            return <span {...spanProps} className='arkham-icons'>k</span>
        case 'cultist':
            return <span {...spanProps} className='arkham-icons'>l</span>
        case 'tablet':
            return <span {...spanProps} className='arkham-icons'>q</span>
        case 'curse':
            return <span {...spanProps} className='arkham-icons'>v</span>
        case 'bless':
            return <span {...spanProps} className='arkham-icons'>w</span>
        case 'auto-fail':
            return <span {...spanProps} className='arkham-icons'>m</span>
        default:
            // Check for nested [[]] for bolding texts
            return findAndSetBold(text)
    }
}

function findAndSetBold(text) {
    return text.split(/\s*[\[\]]\s*/).reduce((prev, current, i) => (!i) ? [current] : prev.concat(<b>{current}</b>, current), [])
}

export default function AHTextReplacer({ text }) {
    // Split to separate text within [], then use reduce to join them together post-changes
    return text.split(/\s*[\[\]]\s*/).reduce((prev, current, i) => {
        // If first one, create array and skip
        if (!i) return [current]
        return prev.concat(<SwitchText text={current} />, current)
    }, [])
}