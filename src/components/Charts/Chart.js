import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useStatsContext } from '../../contexts/StatsContext';
import { groupBy } from '../../helpers/general';
import { FACTION_COLOR } from '../../constants/cardConstants';
import IconsChart from './CommittableIconsChart';
import TraitsChart from './TraitsChart';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const chartDataTransformation = (list, chart) => {
    switch (chart.transformType) {
        case 'committable': {
            return groupBy(list.map(o => {
                if (o.skillWild) {
                    return {
                        ...o,
                        skillWillpower: o.skillWillpower ? o.skillWillpower + o.skillWild : undefined,
                        skillIntellect: o.skillIntellect ? o.skillIntellect + o.skillWild : undefined,
                        skillCombat: o.skillCombat ? o.skillCombat + o.skillWild : undefined,
                        skillAgility: o.skillAgility ? o.skillAgility + o.skillWild : undefined
                    }
                } else {
                    return o
                }
            }), 'factionCode')
        }
        default:
            return groupBy(list, 'factionCode')
    }
}

export default function Chart({ chart }) {
    const { deck } = useStatsContext()

    if (chart.type === 'TraitsChart') {
        return <TraitsChart />
    }

    const options = {
        plugins: {
            title: {
                display: true,
                text: chart.title,
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {

                stacked: true,
            },
        },
    };
    let list = deck?.list || []

    const transformedList = chartDataTransformation(deck?.list || [], chart)

    const labels = [...new Set(list.map(o => o[chart.xAxis]).filter(key => typeof key !== 'undefined'))].sort((a, b) => a - b)
    const data = {
        labels,
        datasets: [
            ...Object.keys(transformedList).map(key => ({
                label: key,
                backgroundColor: FACTION_COLOR[key],
                data: labels.map(label => transformedList[key].filter(card => card[chart.xAxis] == label).map(o => o.qtyInDeck).reduce((a, b) => a + b, 0))
            })),
        ]
    };

    return <Bar options={options} data={data} />
}