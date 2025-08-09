import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function AvgAttemptsPerGradeChart({climbs}) {
    // Count attempts by grade
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

    // Calculate average attempts per grade for rechart
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
                <YAxis allowDecimals={false} stroke='white' />
                <Tooltip />
                <Bar dataKey="avgAttempts" fill="#FFC60B" />
            </BarChart>
        </ResponsiveContainer>

    );
}