import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function ClimbsPerGymChart({climbs}) {
    // Count climbs per gym and extract gym names
    const gymCount = climbs.reduce((accumulator, climb) => {
        const fullName = climb.location;

        // Extract name before '-'
        const shortName = fullName.split(' - ')[0].split(',')[0];
        accumulator[shortName] = (accumulator[shortName] || 0) + 1;
        return accumulator;

    }, {});

    // Convert to array format for rechart
    const data = Object.entries(gymCount).map(([gym, count]) => ({
        name: gym,
        climbs: count,
    }));

    const chartHeight = data.length * 50;

    return (
        <ResponsiveContainer width="100%" height={chartHeight > 500 ? chartHeight : 500}>
            <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#888" />
            <XAxis allowDecimals={false} type="number" stroke="white" />
            <YAxis dataKey="name" type="category" stroke="white" width={'auto'}/>
            <Tooltip />
            <Bar dataKey="climbs" fill="#946eecff" />
            </BarChart>
        </ResponsiveContainer>
    )
}