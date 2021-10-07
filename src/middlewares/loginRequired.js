import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (request, response, next) => {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json({
            errors: ['Requer login!'],
        });
    }

    const [, token] = authorization.split(' ');

    try {
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        const { id, email } = data.id;

        const user = await User.findOne({
            where: {
                id,
                email,
            },
        });

        if (!user) {
            return response.status(401).json({
                errors: ['Usuário inválido!'],
            });
        }

        request.userId = id;
        request.userEmail = email;

        return next();
    } catch (error) {
        return response.status(401).json({
            errors: ['Token expirado ou inválido'],
        });
    }
};
