import { Col } from "react-bootstrap";
import SimpleDeskList from "../ChartPage/SimpleDeskList";
import TraitsChart from "../ChartPage/Charts/TraitsChart";
import { useDeckTriviaContext } from '../../contexts/DeckTriviaContext'
import Charts from "../ChartPage/Charts";

export default function Info() {
    const { deck, charts } = useDeckTriviaContext()
    return (
        <>
            <Col className='col-2'>
                <SimpleDeskList deck={deck} />
            </Col>
            <Col className='col-10'>
                <Charts charts={charts} />
            </Col>
            <TraitsChart deck={deck} />
        </>
    )
}