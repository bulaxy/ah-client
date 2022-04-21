
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { Image } from "react-bootstrap";
import { useCardsContext } from "../../contexts/CardsContext"

export default function CardFlipper({ code }) {
    const { getCardByCode } = useCardsContext()
    const card = getCardByCode(code)
    console.log(card, code)
    if (!card) return <></>
    return (
        <Flippy
            flipOnHover={false} // default false
            flipOnClick={true} // default false
            flipDirection="horizontal" // horizontal or vertical
        >
            <FrontSide className={'p-0'}>
                <Image className={'w-100'} src={`https://arkhamdb.com/${card.imagesrc}`} />
            </FrontSide>
            <BackSide className={'p-0'}>
                <Image className={'w-100'} src={`https://arkhamdb.com/${card.backimagesrc}`} />
            </BackSide>
        </Flippy>
    )
}
