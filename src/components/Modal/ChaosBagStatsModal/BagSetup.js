import { useChaosBagContext } from "../../../contexts/ChaosBagContext"

function TokenButton({ token }) {
    const { addToken, removeToken } = useChaosBagContext()
    return <div>

    </div>
}

export default function BagSetup() {

    return (
        <div className={'d-flex justify-content-around'}>
            <div style={{ width: 50 }}>
                Elder Sign
            </div>
            <div style={{ width: 50 }} onClick={() => { alert(1) }} onContextMenu={() => { alert(-1) }}>
                +1
            </div>
            <div style={{ width: 50 }}>
                0
            </div>
            <div style={{ width: 50 }}>
                -1
            </div>
            <div style={{ width: 50 }}>
                -2
            </div>
        </div >
    )
}