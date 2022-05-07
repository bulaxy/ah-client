import { useEffect, useRef } from "react"

export function useEventListener(
    eventType,
    cb,
    element = window
) {
    const cbRef = useRef(cb)

    useEffect(() => {
        cbRef.current = cb
    }, [cb])

    useEffect(() => {
        if (element == null) return
        const handler = e => cbRef.current(e)
        element.addEventListener(eventType, handler)

        return () => element.removeEventListener(eventType, handler)
    }, [eventType, element])
}