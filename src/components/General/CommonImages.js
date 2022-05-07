import { Image } from 'react-bootstrap'
import { ALL, GUARDIAN, MYSTIC, ROGUE, SEEKER, SURVIVOR, NEUTRAL } from '../../constants/cardConstants'

export function AllFactionIcon(props) {
    return <Image {...props} src={ALL.img} />
}

export function GuardianFactionIcon(props) {
    return <Image {...props} src={GUARDIAN.img} />
}

export function MysticFactionIcon(props) {
    return <Image {...props} src={MYSTIC.img} />
}

export function RogueFactionIcon(props) {
    return <Image {...props} src={ROGUE.img} />
}

export function SeekerFactionIcon(props) {
    return <Image {...props} src={SEEKER.img} />
}

export function SurvivorFactionIcon(props) {
    return <Image {...props} src={SURVIVOR.img} />
}

export function NeutralFactionIcon(props) {
    return <Image {...props} src={NEUTRAL.img} />
}

export const FactionIcons = {
    all: AllFactionIcon,
    guardian: GuardianFactionIcon,
    mystic: MysticFactionIcon,
    rogue: RogueFactionIcon,
    seeker: SeekerFactionIcon,
    survivor: SurvivorFactionIcon,
    neutral: NeutralFactionIcon
}
