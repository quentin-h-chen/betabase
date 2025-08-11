import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#68BC49", "#EE4343", "#389EE8", "#F2A541", "#6A4C93"];

export default function ClimbStyleChart({ climbs }) {
    // Count climbs by type
    const typeCount = climbs.reduce((accumulator, climb) => {
        const type = climb.type;
        accumulator[type] = (accumulator[type] || 0) + 1;
        return accumulator;
    }, {});
    
    const data = Object.entries(typeCount).map(([type, count]) => ({
        type,
        count,
    }));
    
    // Find max count for radius domain
    const maxCount = Math.max(...data.map((d) => d.count));
    
    return(
        <ResponsiveContainer width="100%" height={300}>
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