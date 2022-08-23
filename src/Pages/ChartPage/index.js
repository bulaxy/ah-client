import { Col, Container, Form, Row } from 'react-bootstrap'
import { StatsProvider, useStatsContext } from '../../contexts/StatsContext'
import DeckUrlInput from './DeckUrlInput'
import SimpleDeskList from './SimpleDeskList'
import Charts from './Charts'

export default function DeckChart(props) {

    return (
        <Container >
            <StatsProvider>
                {/* <DeckUrlInput />
                <Row>

                    <Col className='col-2'>
                        <SimpleDeskList />
                    </Col>
                    <Col className='col-10'>
                        <Charts />
                    </Col>
                </Row> */}
            </StatsProvider>
        </Container>
    )
}