import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Array of colors for each type slice in pie chart
const COLORS = ['#68BC49', '#EE4343', '#389EE8'];

/**
 * ClimbsPerTypeChart Component
 * 
 * Displays a pie chart showing how many climbs the user has in each type of route (overhang, roof, slab)
 * 
 * Props:
 * - climbs: Array of climb objects (climb cards)
 */
export default function ClimbsPerTypeChart({ climbs }) {
    /**
     * Count climbs by type
     */
    const typeCount = climbs.reduce((accumulator, climb) => {
        const type = climb.type;
        accumulator[type] = (accumulator[type] || 0) + 1;
        return accumulator;
    }, {});
    
    /**
     * Prepare data for PieChart
     * 
     * Convert typeCount into array of objects for Recharts Pie component
     */
    const data = Object.entries(typeCount).map(([type, count]) => ({
        name: type,
        value: count,
    }));
    
    return(
        <ResponsiveContainer 
            width="100%" 
            height={ window.innerWidth <= 768 ? 400 : 500 }
        >
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="white"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={60} />
            </PieChart>                  
        </ResponsiveContainer>
    )
}