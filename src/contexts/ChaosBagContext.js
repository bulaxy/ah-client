import React, { useContext, useEffect, useMemo, useState } from "react"
import {
    MINUS_ONE_TOKEN,
    MINUS_TWO_TOKEN,
    MINUS_THREE_TOKEN,
    MINUS_FOUR_TOKEN,
    MINUS_FIVE_TOKEN,
    MINUS_SIX_TOKEN,
    MINUS_SEVEN_TOKEN,
    MINUS_EIGHT_TOKEN,
    ZERO_TOKEN,
    PLUS_ONE_TOKEN,
    BLESS_TOKEN,
    CULTIST_TOKEN,
    CURSE_TOKEN,
    ELDER_SIGN_TOKEN,
    ELDER_THING_TOKEN,
    FROST_TOKEN,
    SKULL_TOKEN,
    TABLET_TOKEN,
    AUTO_FAIL_TOKEN
} from '../constants/imageConstants'
import { sumArr, groupBy } from '../helpers/general'
const ChaosBagContext = React.createContext()

export const useChaosBagContext = () => {
    return useContext(ChaosBagContext)
}

const DEFAULT_BAG = {
    one: { tokenName: 'one', value: 1, count: 0, img: PLUS_ONE_TOKEN },
    zero: { tokenName: 'zero', value: 0, count: 0, img: ZERO_TOKEN },
    minusOne: { tokenName: 'minusOne', value: -1, count: 0, img: MINUS_ONE_TOKEN },
    minusTwo: { tokenName: 'minusTwo', value: -2, count: 0, img: MINUS_TWO_TOKEN },
    minusThree: { tokenName: 'minusThree', value: -3, count: 0, img: MINUS_THREE_TOKEN },
    minusFour: { tokenName: 'minusFour', value: -4, count: 0, img: MINUS_FOUR_TOKEN },
    minusFive: { tokenName: 'minusFive', value: -5, count: 0, img: MINUS_FIVE_TOKEN },
    minusSix: { tokenName: 'minusSix', value: -6, count: 0, img: MINUS_SIX_TOKEN },
    minusSeven: { tokenName: 'minusSeven', value: -7, count: 0, img: MINUS_SEVEN_TOKEN },
    minusEight: { tokenName: 'minusEight', value: -8, count: 0, img: MINUS_EIGHT_TOKEN },
    bless: { tokenName: 'bless', value: 2, count: 0, img: BLESS_TOKEN, redraw: true },
    cultist: { tokenName: 'cultist', value: undefined, count: 0, img: CULTIST_TOKEN, customValue: true },
    curse: { tokenName: 'curse', value: -2, count: 0, img: CURSE_TOKEN },
    elderSign: { tokenName: 'elderSign', value: 1, count: 1, img: ELDER_SIGN_TOKEN, customValue: true },
    elderThing: { tokenName: 'elderThing', value: undefined, count: 0, img: ELDER_THING_TOKEN, customValue: true },
    frost: { tokenName: 'frost', value: -1, count: 0, img: FROST_TOKEN, redraw: true }, // 2 frost token = fail
    skull: { tokenName: 'skull', value: undefined, count: 0, img: SKULL_TOKEN, customValue: true },
    tablet: { tokenName: 'tablet', value: undefined, count: 0, img: TABLET_TOKEN, customValue: true },
    autoFail: { tokenName: 'autoFail', value: -999, count: 1, img: AUTO_FAIL_TOKEN }
}

const getDrawCombinations = (index, bag = [], drewTokens = []) => {
    if (bag.length === 0) return []
    let token = bag[index]

    let newDrewTokens = [...drewTokens, token]
    // Auto Fail
    if (token.tokenName === 'autoFail') {
        return [{ result: 'autoFail', token: newDrewTokens }]
    }
    // Frost Token from EotE
    if (token.tokenName == 'frost' && drewTokens.find(o => o.tokenName == 'frost')) {
        return [{ result: 'autoFail', token: newDrewTokens }]
    }
    // Standard Token
    if (!token.redraw) {
        return [{ result: sumArr(newDrewTokens, 'value'), token: newDrewTokens }]
    }

    // Token that require redraw token, appending
    const newBag = bag.filter((o, idx) => idx !== index)
    return newBag.reduce((prev, curr, i) => [...prev, ...getDrawCombinations(i, newBag, newDrewTokens)], [])
}


export const ChaosBagProvider = ({ children }) => {
    const [bag, setBag] = useState(DEFAULT_BAG)
    const [bagCombinations, setBagCombinations] = useState([])
    const [bagStats, setBagStats] = useState({})

    const bagArr = useMemo(() => {
        return Object.keys(bag).map(key => bag[key])
    }, [bag])

    useEffect(() => {

        let fBag = bagArr
            .filter(o => o.count > 0)
            .reduce((prev, curr) => {
                let tempArr = []
                for (var i = 0; i < curr.count; i++) {
                    tempArr.push(curr)
                }
                return [...prev, ...tempArr]
            }, [])
        // Using a clone of fBag instead of the fBag itself
        let combinations = fBag.reduce((prev, current, i) => [...prev, ...getDrawCombinations(i, fBag)], [])

        setBagCombinations(combinations)
        // Grouping by result
        let grouped = groupBy(combinations, 'result')

        // Loop through each items to store the probability and cummlative probability.
        let cumulativeSuccess = 0
        let numCombination = combinations.length

        Object.keys(grouped).sort((a, b) => a - b).reverse().forEach(key => {
            cumulativeSuccess += grouped[key].length
            grouped[key] = {
                tokenCombinations: grouped[key],
                success: grouped[key].length,
                cumulativeSuccess: cumulativeSuccess,
                numCombination: numCombination,
                probability: grouped[key].length / numCombination,
                cumulativeProb: cumulativeSuccess / numCombination,
            }
        })

        setBagStats(grouped)
    }, [bag])

    const addToken = (token) => {
        setBag(prev => ({
            ...prev,
            [token]: { ...prev[token], count: (prev[token].count ?? 0) + 1 }
        }))
    }

    const removeToken = (token) => {
        // Skip if already 0
        if (bag[token].count == 0) return
        setBag(prev => ({
            ...prev,
            [token]: { ...prev[token], count: (prev[token].count ?? 0) - 1 }
        }))
    }


    const updateModifier = (token, value) => {
        setBag(prev => ({
            ...prev,
            [token]: {
                ...prev[token],
                value: Number(value)
            }
        }))
    }

    const toggleRedraw = (token) => {
        setBag(prev => ({
            ...prev,
            [token]: {
                ...prev[token],
                redraw: !prev[token].redraw
            }
        }))
    }

    return (
        <ChaosBagContext.Provider
            value={{
                bag,
                setBag,
                addToken,
                removeToken,
                bagStats,
                bagArr,
                updateModifier,
                toggleRedraw,
                bagCombinations
            }}
        >
            {children}
        </ChaosBagContext.Provider>
    )
}

