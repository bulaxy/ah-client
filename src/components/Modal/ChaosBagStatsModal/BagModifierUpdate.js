import { Accordion, Image } from "react-bootstrap";
import { useChaosBagContext } from "../../../contexts/ChaosBagContext";
import { GiCardDraw } from "react-icons/gi"

const strikeDiag = { background: 'linear-gradient(to left top, transparent 47.75%, currentColor 49.5%, currentColor 50.5%, transparent 52.25%)' }

function TokenButton({ token }) {
    const { bag, toggleRedraw, updateModifier } = useChaosBagContext()
    return <div style={{ width: '4em' }} className={'m-2 '}>
        <Image src={bag[token].img} fluid />
        <input className="w-100 mt-2" onChange={(e) => updateModifier(token, e.target.value)} />
        <GiCardDraw size={'2em'} style={bag[token].redraw ? '' : strikeDiag} onClick={() => toggleRedraw(token)} />
    </div>
}

export default function BagModifierUpdate() {
    return (
        <>
            <Accordion.Header>Bag Token Modifier Update</Accordion.Header>
            <Accordion.Body>
                <div className={'d-flex justify-content-around flex-wrap'}>
                    <TokenButton token={'elderSign'} />
                    <TokenButton token={'skull'} />
                    <TokenButton token={'cultist'} />
                    <TokenButton token={'tablet'} />
                    <TokenButton token={'elderThing'} />
                </div>
            </Accordion.Body>
        </>
    )
}