
import { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import { useStatsContext } from '../../../contexts/StatsContext'

export default function SimpleDeskList() {
    const { deck } = useStatsContext()

    return <ul>
        {deck?.list?.map(card => <li>{card.qtyInDeck} x {card.name}</li>)}
    </ul>

}
