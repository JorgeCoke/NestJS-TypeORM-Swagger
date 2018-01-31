import { Middleware, NestMiddleware, ExpressMiddleware, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Config } from '../../config';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    async resolve(name: string): Promise<ExpressMiddleware> {
        return async (req, res, next) => {
            console.warn(Config.greenLog, `[${name}] Request...`);
            //Lógica Middleware
            if (!req.headers['x-access-token']){
                throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED)
            } else {
                next();
            }
        };
    }
}