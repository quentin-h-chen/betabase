import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

/**
 * AvgAttemptsPerGradeChart Component
 * 
 * Displays horizontal bar chart with average number of attempts per grade
 * 
 * Props:
 * - climbs: Array of climb objects (climb cards)
 */
export default function AvgAttemptsPerGradeChart({climbs}) {
    // Calculate total attempts and number of climbs per grade
    const attemptsByGrade = climbs.reduce((accumulator, climb) => {
        const grade = climb.grade;
        const attempts = Number(climb.attempts);
        if (!accumulator[grade]) {
            accumulator[grade] = { totalAttempts: 0, count: 0 }
        }
        accumulator[grade].totalAttempts += attempts;
        accumulator[grade].count += 1;

        return accumulator;
    }, {});

    // Define grade scale
    const gradeScale = Array.from({ length: 18 }, (_, i) => `V${i}`);

    // Convert gradeScale into array for Rechart Bar Component
    const data = gradeScale.map(grade => {
        const gradeData = attemptsByGrade[grade];
        const avgAttempts = gradeData ? Number((gradeData.totalAttempts / gradeData.count).toFixed(2)) : 0;
        return {
            name: grade,
            avgAttempts: avgAttempts
        };
    });

    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke='white' />
                <YAxis width={30} allowDecimals={false} stroke='white' />
                <Tooltip />
                <Bar dataKey="avgAttempts" fill="#EE4343" />
            </BarChart>
        </ResponsiveContainer>

    );
}