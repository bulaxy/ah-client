import { useEffect, useMemo, useState } from "react"
import { useCardsContext } from "../contexts/CardsContext";
import { arrayToObject } from "../helpers/general";
import { useSISearchFilter } from './useSISearchFilter'

// Use Performing the card filter
export const useCardsFilter = (filter) => {
    const { cards } = useCardsContext()
    const { getSIFilter } = useSISearchFilter()

    return useMemo(() => {
        let filterObj
        if (filter instanceof Array) {
            filterObj = arrayToObject(filter, 'key')
        } else if (filter instanceof Object) {
            filterObj = filter
        } else if (filter instanceof String) {
            filterObj = getSIFilter(filter)
        } else {
            // Not sure when will it get here, ignore for now, return whole array
            return cards
        }

        return cards.filter(card => {
            let result = []
            // If no filter, dont over populate it
            if (Object.keys(filterObj).length === 0) return true

            Object.keys(filterObj).forEach(key => {
                if (typeof filterObj[key] === 'undefined') return
                switch (filterObj[key].operation) {
                    // Using shorten name like the way sharepoint is doing it.
                    case 'eq':
                        result.push(card[key] === filterObj[key].term)
                        break;
                    case 'lt':
                        result.push(card[key] < filterObj[key].term)
                        break;
                    case 'gt':
                        result.push(card[key] > filterObj[key].term)
                        break;
                    case 'le':
                        result.push(card[key] <= filterObj[key].term)
                        break;
                    case 'ge':
                        result.push(card[key] >= filterObj[key].term)
                        break;
                    case 'ne':
                        result.push((card[key] != filterObj[key].term))
                        break;
                    case 'includes':
                        result.push(card[key].includes(filterObj[key].term))
                        break
                    case 'notIncludes':
                        result.push(card[key].includes(filterObj[key].term))
                        break
                }
            })
            return result.indexOf(false) === -1
        })
    }, [cards, filter])
};
