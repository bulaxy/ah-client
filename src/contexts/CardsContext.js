import React, { useContext, useEffect, useMemo, useState, useCallback } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { useAxios } from "../hooks/useAxios"
import { objectKeyToCamelCase, capitalize } from "../helpers/general"

const CardsContext = React.createContext()

export const useCardsContext = () => {
    return useContext(CardsContext)
}

export const CardsProvider = ({ children }) => {
    const [cards, setCards] = useLocalStorage('cardList', [])
    const { data, error, loading } = useAxios('http://localhost:8000/api/arkhamcardlist', 'GET', {}, [cards === null || cards.length == 0 ? true : false])

    useEffect(() => {
        if (data) {
            setCards(objectKeyToCamelCase(data.data))
        }
    }, [data])
    // console.log(cards.filter(o => o.deckOptions).map(o => o.deckOptions), [...new Set(cards.map(obj => Object.keys(obj)).flat())])
    // console.log(cards, [...new Set(cards.map(obj => Object.keys(obj).map(key => JSON.stringify({ key, type: typeof obj[key] }))).flat())].map(json => JSON.parse(json)))

    const getCardByCode = useCallback((code) => {
        return cards.find(card => card.code === code)
    }, [cards])

    const getWhoCanPlayThis = useCallback((code) => {
        const card = getCardByCode(code)
        return cards
            .filter(o => o.deckOptions && o.typeCode === "investigator")
            .filter(o => {
                let deckOptions = o.deckOptions
                deckOptions = [...deckOptions, ...deckOptions.filter(o => o.optionSelect).map(o => o.optionSelect).flat()]

                // if deck options is not true, meaning not an investigator, so skip
                let result = false
                let notConditionMet = false

                for (let i in deckOptions) {
                    let optionObj = deckOptions[i]
                    // If result is true or the card is allowed, skip
                    if (result || notConditionMet) continue
                    // optionSelect already appended to array, so skip
                    if (optionObj.optionSelect) continue

                    // If faction is true, if it is not equal, skip (it can no longer be pass)
                    if (optionObj.faction) {
                        if ((!optionObj.faction.includes(card.factionCode)
                            && !optionObj.faction.includes(card.faction2Code)
                            && !optionObj.faction.includes(card.faction3Code)
                        )) {
                            continue
                        }
                    }

                    if (optionObj.factionSelect) {
                        if ((!optionObj.factionSelect.includes(card.factionCode)
                            && !optionObj.factionSelect.includes(card.faction2Code)
                            && !optionObj.factionSelect.includes(card.faction3Code)
                        )) {
                            continue
                        }
                    }

                    // If lv is true, check if between min and max
                    if (optionObj.level && card.xp) {
                        if (!(card.xp >= optionObj.level.min && card.xp <= optionObj.level.max)) continue
                    }

                    // if (o.code == '07002') console.log(optionObj.trait && card.traits, optionObj, deckOptions)
                    // If type is true
                    if (optionObj.type && card.typeCode) {
                        if (!optionObj.type.includes(card.typeCode)) continue
                    }

                    // not only works with traits (so far)
                    if (optionObj.trait && card.traits) {
                        for (let y in optionObj.trait) {
                            if ((card.traits.toLowerCase().includes(optionObj.trait[y]))) {
                                if (optionObj.not) notConditionMet = true
                                continue
                            }
                        }
                    }

                    // Carolyn's health text, the optionObj.text passes array of regex, check for each of them (in this case 1)
                    // if no matches, skip, if matches but is not, set not to true and continue
                    if (optionObj.text && card.text) {
                        let localCondition = false
                        for (let y in optionObj.text) {
                            let regex = new RegExp(optionObj.text[y])
                            if (card.text.match(regex)) {
                                localCondition = true
                                break
                            }
                        }
                        if (optionObj.not && localCondition) notConditionMet = true
                        if (!localCondition) continue
                    }

                    // Akachi Uses
                    if (optionObj.uses && card.text) {
                        let localCondition = false
                        for (let y in optionObj.uses) {
                            let regex = new RegExp(`Uses.*${optionObj.uses[y]}`)
                            if (card.text.match(regex)) {
                                localCondition = true
                                break
                            }
                        }
                        if (optionObj.not && localCondition) notConditionMet = true
                        if (!localCondition) continue
                    }
                    // If it fall through here, it passes every test, if the condition is a "not" condition, do not update the result
                    if (!optionObj.not) result = true
                }

                if (notConditionMet) return false
                return result
            })
    }, [cards])

    return (
        <CardsContext.Provider
            value={{
                cards,
                getCardByCode,
                getWhoCanPlayThis
            }}
        >
            {children}
        </CardsContext.Provider>
    )
}
