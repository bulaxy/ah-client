import { Col, Container, Form, Row } from 'react-bootstrap'
import { DeckTriviaProvider } from '../../contexts/DeckTriviaContext'
import Info from './Info'
import Guesses from './Guesses'
export default function DeckTriviaPage(props) {

    return (
        <Container >
            <DeckTriviaProvider>
                <Guesses />
                <Info />
            </DeckTriviaProvider>
        </Container>
    )
}