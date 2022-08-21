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


export default function TraitsChart({ chart = {} }) {
    const { deck } = useStatsContext()

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'trait',
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
    const labels = [...new Set(list.map(o => o.traits.split('.').filter(trait => trait).map(trait => trait?.trim())).flat())]
    const data = {
        labels,
        datasets: [
            ...Object.keys(groupedList).map(key => ({
                label: key,
                backgroundColor: FACTION_COLOR[key],
                data: labels.map(label => groupedList[key].filter(card => card.traits.includes(label)).map(o => o.qtyInDeck).reduce((a, b) => a + b, 0))
            })),
        ]
    };
    console.log(data)

    return <Bar options={options} data={data} />
}