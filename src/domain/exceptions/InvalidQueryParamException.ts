import { CustomHttpException } from './CustomHttpException';

export class InvalidQueryParamException extends CustomHttpException {
  statusCode: number;
  message: string;
  code?: number;
  error?: string;
  errors?: any;
  constructor(message: string) {
    super();
    this.statusCode = 400;
    this.message = `Invalid query paramenter: ${message}`;
  }
}
