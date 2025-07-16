import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function ClimbsPerGradeChart({climbs}) {
    const data = [
        { name: 'V0', attempts: 2 },
        { name: 'V1', attempts: 20 },
        { name: 'V2', attempts: 40 },
        { name: 'V3', attempts: 50 },
        { name: 'V4', attempts: 15 },
        { name: 'V5', attempts: 10 },
        { name: 'V6', attempts: 8 },
        { name: 'V7', attempts: 4 },
        { name: 'V8', attempts: 2 },
        { name: 'V9', attempts: 1 },
        { name: 'V10', attempts: 0 },
        { name: 'V11', attempts: 0 },
        { name: 'V12', attempts: 0 },
        { name: 'V13', attempts: 0 },
        { name: 'V14', attempts: 0 },
        { name: 'V15', attempts: 0 },
        { name: 'V16', attempts: 0 },
        { name: 'V17', attempts: 0 },
    ];

    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke='white'/>
            <YAxis stroke='white'/>
            <Tooltip />
            <Bar dataKey="attempts" fill="#FFC60B" />
            </BarChart>
        </ResponsiveContainer>
    );
}