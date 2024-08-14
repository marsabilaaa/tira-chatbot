import { NextApiRequest, NextApiResponse } from 'next';
import dbPromise from '../../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { session_id, message } = req.body;
      const db = await dbPromise;
      await new Promise((resolve, reject) => {
        db.run("INSERT INTO history (session_id, message) VALUES (?, ?)", [session_id, message], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      res.status(200).json({ message: 'Message saved' });
    } catch (error) {
      res.status(500).json({ error: 'Error saving message' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
