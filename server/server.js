import express from 'express';
import cors from 'cors';
import { db, auth } from './firebaseAdmin.js';

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://betabase-7a643.web.app/'
    ]
}));
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

// POST climb request
app.post('/api/climbs', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authHeader.split('Bearer ')[1];
        
        const decodedToken = await auth.verifyIdToken(token);
        const userId = decodedToken.uid;

        const newClimb = {
            ...req.body,
            userId: userId,
        }

        const docRef = await db.collection('climbs').add(newClimb);
        const createdClimb = { id: docRef.id, ...newClimb };
        res.status(201).json(createdClimb);

    } catch (error) {
        console.error('Error adding climb:', error);
        return res.status(500).json({ error: 'Failed to add climb' });
    }
});

// PATCH climb request
app.patch('/api/climbs/:id', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authHeader.split('Bearer ')[1];
        const decodedToken = await auth.verifyIdToken(token);
        const userId = decodedToken.uid;

        const climbId = req.params.id;
        const climbRef = db.collection('climbs').doc(climbId);
        const climbSnapshot = await climbRef.get();

        if (!climbSnapshot.exists) {
            return res.status(404).json({ error: 'Climb not found' });
        }

        const climbData = climbSnapshot.data();

        if (climbData.userId !== userId) {
            return res.status(403).json({ error: 'Permission Denied' });
        }

        const { grade, type, attempts, location, date, note, videoUrl } = req.body;

        const updates = {
            grade,
            type,
            attempts,
            location,
            date,
            note,
            videoUrl
        };

        await climbRef.update(updates);
        const updatedClimb = { id: climbId, ...climbData, ...updates };

        res.status(200).json(updatedClimb);
    
        } catch (error) {
            console.error('Error updating climb:', error);
            return res.status(500).json({ error: 'Failed to update climb' });
    }                       
});

// DELETE climb request
app.delete('/api/climbs/:id', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;   

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authHeader.split('Bearer ')[1];
        const decodedToken = await auth.verifyIdToken(token);
        const userId = decodedToken.uid;
        
        const climbId = req.params.id;
        const climbRef = db.collection('climbs').doc(climbId);
        const climbSnapshot = await climbRef.get();

        if (!climbSnapshot.exists) {
            return res.status(404).json({ error: 'Climb not found' });
        }

        const climbData = climbSnapshot.data();
        if (climbData.userId !== userId) {
            return res.status(403).json({ error: 'Permission Denied' });
        }

        await climbRef.delete();

        res.status(200).json({ message: 'Climb deleted successfully' });
    } catch (error) {
        console.error('Error deleting climb:', error);
        return res.status(500).json({ error: 'Failed to delete climb' });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log('BFF running on http://localhost:3000');
    });
}


export default app;