import { ExceptionFilter, Catch } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Config } from '../../config';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, response) {
        console.log(Config.yellowLog, '[Exception] -> ', exception);

        response.status(exception.getStatus()).json({
            statusCode: exception.getStatus(),
            message: exception.getResponse(),
        });

    }
}