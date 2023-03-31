import { Body, Controller, Get, Post, Req } from '@nestjs/common';

import { AccountM } from '../../domain/models';
import PostLoginUsecase from '../../application/usecases/account/postLogin.usecase';
import GetUserAccountUsecase from '../../application/usecases/account/getUserAccount.usecase';

@Controller('/api/v1/accounts')
export default class AccountController {
  constructor(
    private readonly postLoginUsecase: PostLoginUsecase,
    private getUserAccount: GetUserAccountUsecase,
  ) {}

  @Get('/me')
  public async getAccount(@Req() request): Promise<AccountM> {
    const accountId = request.auth.accountId;
    const optAccount = await this.getUserAccount.handler(accountId);
    return optAccount.get();
  }

  @Post('/login/callback')
  public async accountCallback(
    @Req() request,
    @Body() auth0Request: any,
  ): Promise<AccountM> {
    const { user } = auth0Request;
    const account = await this.postLoginUsecase.handler(user);
    return account.get();
  }
}
