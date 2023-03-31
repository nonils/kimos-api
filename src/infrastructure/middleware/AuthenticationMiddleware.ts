import { Injectable, NestMiddleware } from '@nestjs/common';
import { expressjwt } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../../config/env.enum';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly auth0Domain: string;
  constructor(private configService: ConfigService) {
    this.auth0Domain = this.configService.get(Configuration.AUTH0_DOMAIN);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  use(req: Request, res: Response, next: Function) {
    expressjwt({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${this.auth0Domain}/.well-known/jwks.json`,
      }),
      issuer: `${this.auth0Domain}/`,
      algorithms: ['RS256'],
    })(req, res, (err) => {
      if (err) {
        const status = err.status || 500;
        const message =
          err.message || 'Sorry we were unable to process your request.';
        return res.status(status).send({
          message,
        });
      }
      next();
    });
  }
}
