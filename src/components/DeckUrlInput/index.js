
import { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useStatsContext } from '../../contexts/StatsContext'

export default function DeckUrlInput() {
    const [url, setUrl] = useState('')
    const { updateUrl, toggleRefresh } = useStatsContext()

    const onUrlChange = (e) => {
        setUrl(e.target.value)
    }

    const onClick = () => {
        updateUrl(url)
    }

    return <InputGroup
        className="mt-2"
    >
        <Form.Control
            placeholder="Decklist ID/URL"
            aria-label="Decklist ID/URL"
            aria-describedby="basic-addon1"
            onChange={onUrlChange}
            value={url}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={onClick}>
            Load Deck
        </Button>
    </InputGroup>

}
