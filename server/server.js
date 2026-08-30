import express from 'express';
import cors from 'cors';
import { db, auth } from './firebaseAdmin.js';

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json());

// GET climbs request
app.get('/api/climbs', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authHeader.split('Bearer ')[1];

        const decodedToken = await auth.verifyIdToken(token);
        const userId = decodedToken.uid;

        const climbsSnapshot = await db.collection('climbs').where('userId', '==', userId).get();
        const climbs = climbsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        res.json(climbs);

    } catch (error) {
        console.error('Error fetching climbs:', error);
        return res.status(500).json({ error: 'Failed to fetch climbs' });
    }
});

app.listen(PORT, () => {
    console.log(`BFF running on http://localhost:${PORT}`);
});