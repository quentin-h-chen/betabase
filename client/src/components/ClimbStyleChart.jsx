import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from "recharts";

/**
 * ClimbStyleChart Component
 * 
 * Displays radar chart with the number of climbs per route type (overhang, roof, slab)
 * 
 * Props:
 * - climbs: Array of climb objects (climb cards)
 */
export default function ClimbStyleChart({ climbs }) {
    /**
     * Count climbs by type
     */
    const typeCount = climbs.reduce((accumulator, climb) => {
        const type = climb.type;
        accumulator[type] = (accumulator[type] || 0) + 1;
        return accumulator;
    }, {});
    
    /**
     * Prepares data for RadarChart
     * 
     * Converts typeCount object into array of objects for Recharts Radar component 
     */
    const data = Object.entries(typeCount).map(([type, count]) => ({
        type,
        count,
    }));
    
    // Find max count for radius domain
    const maxCount = Math.max(...data.map((d) => d.count));
    
    return(
        <ResponsiveContainer width="100%" height={250}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="type" stroke="white" />
                <PolarRadiusAxis
                    angle={30}
                    domain={[0, maxCount]}
                    stroke="white"
                    tick={false}
                    axisLine={false}
                />
                <Radar
                    name="Climbs Per Type"
                    dataKey="count"
                    stroke="#389EE8"
                    fill="#389EE8"
                    fillOpacity={0.6}
                />
                <Tooltip />
            </RadarChart>              
        </ResponsiveContainer>
    )
}