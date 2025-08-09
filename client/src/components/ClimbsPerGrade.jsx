import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function ClimbsPerGradeChart({climbs}) {
    // Object to count climbs per grade
    const gradeCount = climbs.reduce((accumulator, climb) => {
        const grade = climb.grade;
        accumulator[grade] = (accumulator[grade] || 0) + 1;
        return accumulator;
    }, {});

    // Organizing array by grade scale
    const gradeScale = Array.from({length: 18}, (_, i) => `V${i}`);

    // Transform into array format for recharts
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