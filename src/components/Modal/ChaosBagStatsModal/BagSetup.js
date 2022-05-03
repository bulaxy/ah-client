import { useChaosBagContext } from "../../../contexts/ChaosBagContext"
import { Image, Button, Accordion } from 'react-bootstrap'
import { sumArr } from "../../../utils/general";

function TokenButton({ token }) {
    const { bag, addToken, removeToken } = useChaosBagContext()

    return <div style={{ width: '4em' }} className={'m-2'}>
        <Image src={bag[token].img} fluid onClick={() => addToken(token)} onContextMenu={(e) => { e.preventDefault(); removeToken(token) }} />
        <div className='d-flex justify-content-between'>
            <Button variant="outline-secondary" className="rounded-circle" size='sm' style={{ fontSize: '0.5em' }}>-</Button>
            {bag[token].count ?? 'N/A'}
            <Button variant="outline-secondary" className="rounded-circle" size='sm' style={{ fontSize: '0.5em' }}>+</Button>
        </div>
    </div>
}

export default function BagSetup() {
    const { bagArr } = useChaosBagContext()

    return (
        <>
            <Accordion.Header>Bag Setup (Current Total {sumArr(bagArr, 'count')} Tokens)</Accordion.Header>
            <Accordion.Body>
                <div className={'d-flex justify-content-around flex-wrap'}>
                    {bagArr.map(o => <TokenButton key={o.tokenName} token={o.tokenName} />)}
                </div>
            </Accordion.Body>
        </>
    )
}