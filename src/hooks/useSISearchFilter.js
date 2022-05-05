import { useEffect, useMemo, useState } from "react"
import { useCardsContext } from "../contexts/CardsContext";

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
}

// Use Single Line Search Filter
export const useSISearchFilter = (searchTerms) => {
  const { cards } = useCardsContext()

  return useMemo(() => {
    cards.filter(card => {
      searchTerms
        // Map to split by space but exclude "" 
        .match("^([^:]+)(:|>|<)([^:]+)")
        // Split by first group being either 1-2 charact long before the operator, ":" or ">" or ">", then the rest of the string being the terms
        .map(term => term.match('^(.{1,2})(:|>|<)(.*)'))
    })
  }, [cards, text])

};


/*
Example: a:1 c>1 Shows all cards with 1 Agility icon or 1 Agility and more than 1 Combat icon or 1 Combat
*/