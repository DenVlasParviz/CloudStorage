import type { NextApiRequest, NextApiResponse } from 'next';
import { testConnection } from '~/server/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const isConnected = await testConnection();

    res.status(200).json({
        connected: isConnected,
        message: isConnected ? 'Database connected!' : 'Database connection failed'
    });
}