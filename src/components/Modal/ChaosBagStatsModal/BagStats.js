import { useState, useMemo } from "react"
import { useChaosBagContext } from "../../../contexts/ChaosBagContext"
import { Image, Button, Accordion, Table } from 'react-bootstrap'

function CombinationView({ resultSet }) {
    const { bagStats = {}, bag } = useChaosBagContext()
    const combinations = useMemo(() => {
        let arr = bagStats?.[resultSet]?.tokenCombinations?.map(obj => JSON.stringify(obj.token)) ?? []
        // Trying to use set from es6
        let unique = [...new Set(arr)];

        // Deep compare array of Object, and count number of equals one
        return unique.map(o => ({ draw: JSON.parse(o), count: arr.filter(jsonString => jsonString == o).length }))
    }, [resultSet])

    return <div className='d-flex flex-wrap px-3'>
        {combinations.map(combination =>
            <div className='px-1'>
                <div className='rounded border-info border p-1'>
                    {combination.draw.map(token => <Image style={{ width: '2em' }} src={token.img} fluid />)}
                    <div className='text-center font-weight-bold'>x{combination.count}</div>
                </div>
            </div>
        )}
    </div>
}

export default function BagSetup() {
    const { bagStats = {} } = useChaosBagContext()
    const [resultSet, setResultSet] = useState()
    return (
        <>
            <Accordion.Header>Bag Stats</Accordion.Header>
            <Accordion.Body className='px-0'>
                <Table bordered size="sm" responsive>
                    <thead>
                        <tr>
                            <th>Value</th>
                            {Object.keys(bagStats)
                                .sort((a, b) => a - b)
                                .reverse()
                                .map(key => (
                                    <th onClick={() => setResultSet(key)}>{key}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Prob.</td>
                            {Object.keys(bagStats)
                                .sort((a, b) => a - b)
                                .reverse()
                                .map(key => (
                                    <td onClick={() => setResultSet(key)}>{Math.round(bagStats[key].probability * 100)}%</td>
                                ))
                            }
                        </tr>
                        <tr>
                            <td>Cum. Prob.</td>
                            {Object.keys(bagStats)
                                .sort((a, b) => a - b)
                                .reverse()
                                .map(key => (
                                    <td onClick={() => setResultSet(key)}>{Math.round(bagStats[key].cumulativeProb * 100)}%</td>
                                ))
                            }
                        </tr>
                    </tbody>
                </Table>
                <CombinationView resultSet={resultSet} />
            </Accordion.Body>
        </>
    )
}