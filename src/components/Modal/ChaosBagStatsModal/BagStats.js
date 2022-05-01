import { useChaosBagContext } from "../../../contexts/ChaosBagContext"
import { Image, Button, Accordion, Table } from 'react-bootstrap'

export default function BagSetup() {
    const { bagStats = {} } = useChaosBagContext()
    return (
        <>
            <Accordion.Header>Bag Stats</Accordion.Header>
            <Accordion.Body>
                <Table bordered size="sm" responsive>
                    <thead>
                        <tr>
                            <th>Value</th>
                            {Object.keys(bagStats).sort((a, b) => a - b).reverse().map(key => <th>{key}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Probability</td>
                            {Object.keys(bagStats).sort((a, b) => a - b).reverse().map(key => <td>{Math.round(bagStats[key].probability * 100)}%</td>)}
                        </tr>
                        <tr>
                            <td>Cumulative Probability</td>
                            {Object.keys(bagStats).sort((a, b) => a - b).reverse().map(key => <td>{Math.round(bagStats[key].cumulativeProb * 100)}%</td>)}
                        </tr>
                    </tbody>
                </Table>
            </Accordion.Body>
        </>
    )
}