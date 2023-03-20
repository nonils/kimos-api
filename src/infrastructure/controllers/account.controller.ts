import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

@Controller('/api/v1/accounts')
export default class AccountController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Post('/registrations/callback')
  public async createAccountAfterAuth0(
    @Res() request,
    @Body() product: any,
  ): Promise<any> {
    console.log(product);
    return request.status(HttpStatus.CREATED).json(product);
  }
}
