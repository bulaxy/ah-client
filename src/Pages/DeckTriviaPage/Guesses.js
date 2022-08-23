
import { Row } from 'react-bootstrap'
import { useDeckTriviaContext } from '../../contexts/DeckTriviaContext'
export default function Guesses() {
    const {
        setGuest,
        showAnswer,
        answer,
        getNewDeck
    } = useDeckTriviaContext()
    return (
        <Row>
            123
        </Row>
    )
}