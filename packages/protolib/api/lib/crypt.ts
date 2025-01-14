import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { getLogger } from '../../base';

const logger = getLogger()

export const hash = async (password: string) => bcrypt.hash(password, 10)
export const checkPassword = async (password: string, hash: string) => bcrypt.compare(password, hash)

export const genToken = (data:any) => {
    logger.debug({ data }, `signing: ${JSON.stringify(data)}`)
    return jwt.sign(data, process.env.TOKEN_SECRET ?? '', { expiresIn: '3600000s' });
}

export const verifyToken = (token: string) => { 
    return jwt.verify(token, process.env.TOKEN_SECRET ?? '');
}