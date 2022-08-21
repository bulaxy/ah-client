import { Col, Container, Form } from 'react-bootstrap'
import { StatsProvider, useStatsContext } from '../../contexts/StatsContext'
import DeckUrlInput from './DeckUrlInput'
import SimpleDeskList from './SimpleDeskList'
import Charts from './Charts'

export default function DeckChart(props) {

    return (
        <Container >
            <StatsProvider>
                <DeckUrlInput />
                <Col>
                    {/* <SimpleDeskList /> */}
                </Col>
                <Col>
                    <Charts />
                </Col>
            </StatsProvider>
        </Container>
    )
}