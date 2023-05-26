import { Controller, Get } from '@nestjs/common';

@Controller('/api/v1/code-version-providers')
export default class CodeVersionProviderController {
  @Get()
  async getAllCodeVersionProviders(): Promise<any> {
    return [
      {
        id: '1',
        name: 'Github',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png',
        url: 'https://github.com',
      },
      {
        id: '2',
        name: 'Gitlab',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png',
        url: 'https://gitlab.com',
      },
      {
        id: '3',
        name: 'BitBucket',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png',
        url: 'https://bitbucket.com',
      },
    ];
  }
}
