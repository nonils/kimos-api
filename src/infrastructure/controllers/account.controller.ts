import { Body, Controller, Post, Req } from '@nestjs/common';
import { AccountM } from '../../domain/models';
import PostLoginUsecase from '../../application/usecases/account/associateAccountToAuth0.usecase';

@Controller('/api/v1/accounts')
export default class AccountController {
  constructor(private readonly postLoginUsecase: PostLoginUsecase) {}

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
