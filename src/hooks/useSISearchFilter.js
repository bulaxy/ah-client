import { useCallback } from "react"

const SMART_KEY_PAIR = {
	v: { value: 'flavor', defaultOperator: 'includes' },
	// y:{value:'',defaultOperator:'includes'},
	// e:{value:'',defaultOperator:'includes'},
	f: { value: 'factionName', defaultOperator: 'includes' },
	l: { value: 'illustrator', defaultOperator: 'includes' },
	k: { value: 'trails', defaultOperator: 'includes' },
	o: { value: 'cost', defaultOperator: 'eq' },
	w: { value: 'skillWillpower', defaultOperator: 'eq' },
	c: { value: 'skillCombat', defaultOperator: 'eq' },
	i: { value: 'skillIntellect', defaultOperator: 'eq' },
	a: { value: 'skillAgility', defaultOperator: 'eq' },
	d: { value: 'skillWild', defaultOperator: 'eq' },
	t: { value: 'type', defaultOperator: 'eq' },
	b: { value: 'subtypeName', defaultOperator: 'eq' },
	u: { value: 'isUnique', defaultOperator: 'eq' },
	h: { value: 'health', defaultOperator: 'eq' },
	s: { value: 'sanity', defaultOperator: 'eq' },
	x: { value: 'text', defaultOperator: 'includes' },
	p: { value: 'xp', defaultOperator: 'eq' },
	qt: { value: 'quantity', defaultOperator: 'eq' },
	z: { value: 'slot', defaultOperator: 'eq' },
	j: { value: 'victory', defaultOperator: 'eq' },
	n: { value: 'name', defaultOperator: 'includes' }
}

// Use Single Line Search Filter
export const useSISearchFilter = () => {
	const getSIFilter = useCallback((searchTerms) => {
		// Map to split by space but exclude "" 
		/*  
		------------------------------------------------------------
		Regex Breakdown
		- Capture any "?:" 
		- [^\s'"]+" any group split by space that happens 0 or more times (+)
		- Or ""[^"]*"" capture any character start with '"' until the end of '"' but does not end on itself [^"]
		- Repeat the same thing for single quotation mark
	    
		- Review - Whether should capture single quotation mark is another question
		------------------------------------------------------------
		*/
		if (typeof searchTerms !== 'string' || searchTerms === '' || searchTerms === ' ') return []

		if (!searchTerms.includes(':') && !searchTerms.includes('>') && !searchTerms.includes('<')) return [{ key: 'name', operation: 'includes', term: searchTerms }]

		// .match(/(?:[^\s"']+|"[^"]*")+/g)
		return searchTerms
			.match(/(?:[^\s"']+|["][^"]*"|'[^']*')+/g)
			// Split by first group being either 1-2 character long before the operator, ":" or ">" or ">", then the rest of the string being the terms
			.map(term => {
				let split = term.match(/^(.{1,2})(:|>|<)(.*)/)
				if (split !== null) return split
				return [`n:${term}`, 'n', ':', term]
			}) // or '^(.{1,2})(:|>|<)(.*)'
			// Convert into array Object where cards normal filter uses
			.map(matchesArr => {
				// Input validation on the format
				if (matchesArr.length !== 4) return undefined
				let smartKeyObject = SMART_KEY_PAIR[matchesArr[1]]
				// If no matches key, escape
				if (typeof smartKeyObject == 'undefined') return undefined
				let operator
				switch (matchesArr[2]) {
					case ":":
						operator = SMART_KEY_PAIR[matchesArr[1]].defaultOperator
						break
					case ">":
						operator = 'gt'
						break
					case "<":
						operator = 'lt'
						break
					default:
						operator = undefined
				}
				// No matching operator (should never happen?), escape
				if (!operator) return undefined

				return {
					// First part being the smart key value pair value
					key: smartKeyObject.value,
					operation: operator,
					term: matchesArr[3],
				}
			})
	}, [])

	return { getSIFilter }
};
