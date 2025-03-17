import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mijanurrahman';

export const signToken = (userId: string, role: string) => {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '30d' });
};

export const verifyToken = async (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            userId: string;
            role: string;
        };
        return decoded;
    } catch (error) {
        return null;
    }
};
