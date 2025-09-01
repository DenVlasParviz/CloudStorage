import { testConnection } from '~/server/db';

export async function GET() {
    const isConnected = await testConnection();

    return Response.json({
        connected: isConnected,
        message: isConnected ? 'Database connected!' : 'Database connection failed'
    });
}