
import { useState } from 'react'
import { Form, Button, InputGroup, Card, Row, Col } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import Chart from './Chart'
import { useStatsContext } from '../../../contexts/StatsContext'
import TraitsChart from './TraitsChart'


export default function Charts() {
    const { charts } = useStatsContext()

    return <Row xs={1} md={3} className="g-4">
        {charts?.map(chart =>
            <Col>
                <Chart chart={chart} />
            </Col>
        )}
    </Row>
}
