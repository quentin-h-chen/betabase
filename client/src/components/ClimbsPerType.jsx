import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ['#68BC49', '#EE4343', '#389EE8'];

export default function ClimbsPerTypeChart({climbs}) {
    // Count climbs by type
    const typeCount = climbs.reduce((accumulator, climb) => {
        const type = climb.type;
        accumulator[type] = (accumulator[type] || 0) + 1;
        return accumulator;
    }, {});
    
    const data = Object.entries(typeCount).map(([type, count]) => ({
        name: type,
        value: count,
    }));
    
    return(
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
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