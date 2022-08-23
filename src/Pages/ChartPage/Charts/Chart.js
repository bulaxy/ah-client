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


export default function Chart({ chart, deck }) {
    // const { deck } = useStatsContext()

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

    const groupedList = groupBy(list, 'factionCode')
    const labels = [...new Set(list.map(o => o[chart.xAxis]).filter(key => typeof key !== 'undefined'))].sort((a, b) => a - b)
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