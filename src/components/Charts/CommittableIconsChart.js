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
import { useStatsContext } from '../../../contexts/StatsContext';
import { groupBy } from '../../../helpers/general';
import { FACTION_COLOR } from '../../../constants/cardConstants';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function CommittableIconsChart({ chart }) {
    const { deck } = useStatsContext()

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Committable Icons (included Wild)',
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

    const groupedList = groupBy(list, 'factionCode')
    const labels = ['Agility', 'Combat', 'Intellect', 'Willpower', 'Wild']
    const data = {
        labels,
        datasets: [
            ...Object.keys(groupedList).map(key => ({
                label: key,
                backgroundColor: FACTION_COLOR[key],
                data: labels.map(label => groupedList[key].filter(card => card[chart.xAxis] == label).map(o => o.qtyInDeck).reduce((a, b) => a + b, 0))
            })),
        ]
    };

    return <Bar options={options} data={data} />
}