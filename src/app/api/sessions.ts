import { NextApiRequest, NextApiResponse } from 'next';
import dbPromise from '../../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const db = await dbPromise;
      const sessions = await new Promise((resolve, reject) => {
        db.all("SELECT DISTINCT session_id FROM history", [], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            const sessions = rows.map(row => ({ session_id: row.session_id }));
            resolve(sessions);
          }
        });
      });
      res.status(200).json({ sessions });
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving sessions' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
