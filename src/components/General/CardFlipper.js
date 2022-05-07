
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { Image } from "react-bootstrap";
import { useCardsContext } from "../../contexts/CardsContext"
import { useMemo } from 'react';
import { PLAYER_CARD_BACK } from "../../constants/imageConstants"
export default function CardFlipper({ code }) {
    const { getCardByCode } = useCardsContext()
    const card = getCardByCode(code)
    console.log('**', code, card)
    const backSrc = useMemo(() => {
        if (!card) return ''
        if (card.backimagesrc) return 'https://arkhamdb.com/' + card.backimagesrc
        return PLAYER_CARD_BACK

    }, [card])
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
                <Image className={'w-100'} src={backSrc} />
            </BackSide>
        </Flippy>
    )
}
