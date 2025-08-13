import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

/**
 * ClimbsPerGradeChart Component
 * 
 * Displays a horizontal bar chart with the number of climbs per grade
 * 
 * Props:
 * - climbs: Array of climb objects (climb cards)
 */
export default function ClimbsPerGradeChart({climbs}) {
    /**
     * Count climbs per grade
     */
    const gradeCount = climbs.reduce((accumulator, climb) => {
        const grade = climb.grade;
        accumulator[grade] = (accumulator[grade] || 0) + 1;
        return accumulator;
    }, {});

    // Organizing array by grade scale
    const gradeScale = Array.from({length: 18}, (_, i) => `V${i}`);

    /**
     * Prepare data for BarChart
     * 
     * Convert gradeScale to array of objects for Recharts Bar component
     */
    const data = gradeScale.map(grade => ({
        name: grade,
        climbs: gradeCount[grade] || 0
    }));

    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke='white'/>
            <YAxis allowDecimals={false} stroke='white'/>
            <Tooltip />
            <Bar dataKey="climbs" fill="#FFC60B" />
            </BarChart>
        </ResponsiveContainer>
    );
}