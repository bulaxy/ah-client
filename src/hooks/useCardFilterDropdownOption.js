import { useEffect, useState } from "react"
import { useCardsContext } from "../contexts/CardsContext";

export const useCardFilterDropdownOption = (key, seperator) => {
  // Maybe  storing it locally instead? ideally probably store it on server side to reduce client side loading since therre might be a lot of fields might need to go through this.
  const [options, setOptions] = useState([])
  const { cards } = useCardsContext()

  useEffect(() => {
    let arr = cards
      .map(o => {
        // If there is a seperator like trails, have seperator of ., split it and trim white spaces
        if (seperator) {
          return o?.[key]
            ?.split(seperator)
            ?.map(o => o.trim())
        } else {
          return o?.[key]
        }
      })
      // Flatten if it have been split
      .flat()
      // Remove any empty or undefined one
      .filter(o => !(o === '' || typeof o === 'undefined'))

    // Remove Duplicate using set, and map it to dropdown input (text,value)
    setOptions([...new Set(arr)].map(o => ({ label: o, value: o })))
  }, [cards])

  return options
};
