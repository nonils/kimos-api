import { Controller, Get } from '@nestjs/common';

@Controller('/api/v1/cicd-providers')
export default class CICDProviderController {
  @Get()
  async getAllCICDProviders(): Promise<any> {
    return [
      {
        id: '1',
        name: 'Github Actions',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png',
        url: 'https://actions.github.com',
      },
      {
        id: '2',
        name: 'Jenkins',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png',
        url: 'https://actions.github.com',
      },
      {
        id: '3',
        name: 'Circle CI',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png',
        url: 'https://actions.github.com',
      },
      {
        id: '4',
        name: 'Travis CI',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png',
        url: 'https://actions.github.com',
      },
    ];
  }
}
