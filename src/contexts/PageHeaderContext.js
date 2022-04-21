import React, { useContext, useEffect, useState } from "react"
import { Helmet } from "react-helmet"

const PageHeaderContext = React.createContext()

export const usePageHeaderContext = () => {
    return useContext(PageHeaderContext)
}

export const PageHeaderProvider = ({ children }) => {
    const [title, setTitle] = useState('Arkham LCG Brainstormer')
    const [metaContent, setMetaContent] = useState({})
    const [favicon, setFavicon] = useState('')

    useEffect(() => {
        const faviconEl = document.getElementById("favicon")
        faviconEl.href = favicon
    }, [favicon])

    return (
        <PageHeaderContext.Provider
            value={{
                setTitle,
                setMetaContent,
                setFavicon
            }}
        >
            <Helmet>
                <title>{title}</title>
                {Object.keys(metaContent).map(key => <meta name={key} content={metaContent[key]} />)}
            </Helmet>
            {children}
        </PageHeaderContext.Provider>
    )
}