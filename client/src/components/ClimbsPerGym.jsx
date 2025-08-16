import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

/**
 * ClimbsPerChart Component
 * 
 * Displays a vertical bar chart with the number of climbs per gym location
 * 
 * Props:
 * - climbs: Array of climb objects (climb cards)
 */
export default function ClimbsPerGymChart({climbs}) {
    /**
     * Count climbs per page
     * 
     * Extract gym name from full address
     */
    const gymCount = climbs.reduce((accumulator, climb) => {
        const fullName = climb.location;

        // Extract name before '-'
        const shortName = fullName.split(' - ')[0].split(',')[0];
        accumulator[shortName] = (accumulator[shortName] || 0) + 1;
        return accumulator;

    }, {});

    /**
     * Prepare data for BarChart
     * 
     * Convert gymCount object into array of objects for Recharts Bar component
     */
    const data = Object.entries(gymCount).map(([gym, count]) => ({
        name: gym,
        climbs: count,
    }));

    // Enable chart height to be set dynamically
    const chartHeight = data.length * 80;

    return (
        <ResponsiveContainer width="100%" height={chartHeight > 500 ? chartHeight : 500}>
            <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#888" />
            <XAxis 
                allowDecimals={false} 
                type="number" 
                stroke="white" 
                tick={{ fontSize: window.innerWidth <= 768 ? 14 : 16 }}
            />
            <YAxis 
                dataKey="name" 
                type="category" 
                stroke="white" 
                width={'auto'}
                tick={{ fontSize: window.innerWidth <= 768 ? 14 : 16 }}
            />
            <Tooltip />
            <Bar dataKey="climbs" fill="#946eecff" />
            </BarChart>
        </ResponsiveContainer>
    )
}