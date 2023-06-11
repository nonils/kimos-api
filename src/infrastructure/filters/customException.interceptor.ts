import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { CustomHttpException } from '../../domain/exceptions/CustomHttpException';

@Catch(CustomHttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.statusCode;
    const { message, code, error, errors } = exception;

    response.status(status).json({ message, code, error, errors });
  }
}
